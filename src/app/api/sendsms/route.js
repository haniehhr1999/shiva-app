// app/api/send-code/route.js
export async function POST(request) {
  try {
    const body = await request.json();
    const { phone } = body;

    const code = Math.floor(Math.random() * 99999)
      .toString()
      .padStart(5, "0");

    console.log("Phone ->", phone);
    console.log("Code ->", code);

    const response = await fetch("http://edge.ippanel.com/v1/api/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "application/json",
      },
      body: JSON.stringify(
        // {
        //   op: "pattern",
        //   user: "u09059467142",
        //   pass: "Faraz@2057020022465715",
        //   fromNum: "3000505",
        //   toNum: phone,
        //   patternCode: "jqcrkffb9sevvss",
        //   inputData: [{ "verification-code": code }],
        // },
        {
          sending_type: "pattern",
          from_number: "+983000505",
          code: "jqcrkffb9sevvss",
          recipients: [phone],
          params: {
            code: code,
          },
        }
      ),
    });

    console.log('response =>' , response)

    const data = response.json();
    console.log("Response ->", data);

    if (response.ok) {
      return new Response(
        JSON.stringify({ message: "Code Sent Successfully :))" }),
        { status: 201, headers: { "Content-Type": "application/json" } }
      );
    } else {
      console.error("Error response from SMS API:", data);
      return new Response(JSON.stringify({ message: "Unknown Error !!" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    console.error("Catch error:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
