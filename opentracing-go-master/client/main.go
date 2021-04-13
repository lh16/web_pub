package main
//https://studygolang.com/articles/25337?hmsr=joyk.com&utm_source=joyk.com&utm_medium=referral  单进程与多进程（远程调用之间的span传递）
//取一个链路对象并命名为服务名，进行根span创建和命名，取上下文进行子span创建接龙。如果链路需要跟踪不同进程上的代码（分布式http或RPC调接口），则将span上下文注入http请求，服务端接收时重新实例一个对象不同服务名，并解析出span上下文接续接龙。GRPC不同进程是怎么传递？也是注入传递略有不同https://www.jianshu.com/p/ec965bbfe84e
import (
	"context"
	"fmt"
	"io/ioutil"
	"math/rand"
	"net/http"
	"os"
	"strconv"
	"time"

	traceconfig "binTest/jaegerTest/CSJaeger/tracelib"

	"github.com/opentracing/opentracing-go"
	"github.com/opentracing/opentracing-go/ext"
	"github.com/opentracing/opentracing-go/log"
)

const (
	URL        = "http://localhost:8080"
	LIST_API   = "/getList"
	RESULT_API = "/getResult"

	RANDLETTERCOL = "abcdefghijklmnopqrstuvwxyz0123456789"
)

var (
	flag = make(chan bool)
)

func saveResponse(response []byte) error {
	err := ioutil.WriteFile("response.txt", response, 0644)
	if err != nil {
		fmt.Println(err)
		return err
	}

	return nil
}

func sendRequest(req *http.Request, ctx context.Context) {
	reqPrepareSpan, _ := opentracing.StartSpanFromContext(ctx, "Client_sendRequest")
	defer reqPrepareSpan.Finish()

	go func(req *http.Request) {
		resp, err := http.DefaultClient.Do(req)

		if err != nil {
			fmt.Printf("Do send requst failed(%s)\n", err)
			return
		}

		respSpan, _ := opentracing.StartSpanFromContext(ctx, "Client_response")
		defer respSpan.Finish()

		defer resp.Body.Close()

		body, err := ioutil.ReadAll(resp.Body)
		if err != nil {
			fmt.Printf("ReadAll error(%s)\n", err)
			return
		}

		if resp.StatusCode != 200 {
			return
		}

		fmt.Printf("Response:%s\n", string(body))

		respSpan.LogFields(
			log.String("event", "getResponse"),
			log.String("value", string(body)),
		)

		saveResponse(body)

		flag <- true
	}(req)
}

func randomString(n int) string {
	r := make([]byte, n)
	ranSize := len(RANDLETTERCOL)
	for i := range r {
		r[i] = RANDLETTERCOL[rand.Intn(ranSize)]
	}

	return string(r)
}

func main() {

	if len(os.Args) < 2 {
		fmt.Println("Argument error(getlist or getresult number) ")
		os.Exit(1)
	}

	tracer, closer := traceconfig.TraceInit("CS-tracing", "const", 1)
	defer closer.Close()
	opentracing.SetGlobalTracer(tracer)

	span := tracer.StartSpan(fmt.Sprintf("%s trace", os.Args[1]))//一级根span
	span.SetTag("trace to", os.Args[1])

	rand.Seed(time.Now().UnixNano())
	sn := randomString(16)
	fmt.Printf("serialno:%s\n", sn)
	span.SetBaggageItem("serialno", sn)

	defer span.Finish()

	ctx := opentracing.ContextWithSpan(context.Background(), span)//取一级上下文

	api := ""
	var err error

	if os.Args[1] == "getlist" {
		api = LIST_API
	} else if os.Args[1] == "getresult" {
		api = RESULT_API
		num, err := strconv.Atoi(os.Args[2])

		if err != nil || num <= 0 {
			fmt.Println("getresult input parameter error!")
			os.Exit(1)
		}
	}
	reqSpan, _ := opentracing.StartSpanFromContext(ctx, "Client_"+api+" request")//对一级上下文 创建子span
	//ctx := opentracing.ContextWithSpan(ctx, reqSpan)//这样是不是取二级span的上下文，可以接孙子级span？？
	defer reqSpan.Finish()

	reqURL := URL + api
	req, err := http.NewRequest("GET", reqURL, nil)

	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}

	ext.SpanKindRPCClient.Set(span)
	ext.HTTPUrl.Set(span, reqURL)
	ext.HTTPMethod.Set(span, "GET")
	span.Tracer().Inject(
		span.Context(),
		opentracing.HTTPHeaders,
		opentracing.HTTPHeadersCarrier(req.Header),
	)

	if os.Args[1] == "getresult" {
		q := req.URL.Query()
		q.Add("num", os.Args[2])
		req.URL.RawQuery = q.Encode()
	}

	fmt.Println(req.URL.String())
	reqSpan.LogFields(
		log.String("event", api),
		log.String("value", api),
	)

	sendRequest(req, ctx)

	<-flag
}
