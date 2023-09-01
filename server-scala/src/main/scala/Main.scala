import java.io.{InputStream, InputStreamReader, BufferedReader}
import scala.annotation.tailrec
import io.circe._, io.circe.parser._

object Main extends cask.MainRoutes {

  // Define a function to convert an InputStream to a String
  def inputStreamToString(inputStream: InputStream): String = {
    // Create a BufferedReader to read from the InputStream
    val reader = new BufferedReader(new InputStreamReader(inputStream))

    // Define a StringBuilder to store the read data
    val stringBuilder = new StringBuilder()

    // Define a function to read data from the BufferedReader recursively
    @tailrec
    def readData(): Unit = {
      val line = reader.readLine()
      if (line != null) {
        stringBuilder.append(line)
        stringBuilder.append('\n') // Add a newline character to separate lines if needed
        readData()
      }
    }

    // Start reading data from the InputStream
    readData()

    // Close the BufferedReader
    reader.close()

    // Convert the StringBuilder to a String and return it
    stringBuilder.toString()
  }

  @cask.get("/")
  def hello(): String = {
    "Hello World!"
  }

  @cask.route("/uml", methods = Seq("post"))
  def build_code(request: cask.Request): cask.Response[String] = {
    val clase = new UMLClass("default", Seq("default1", "default2"))
    val data: String = inputStreamToString(request.data)
    var json_data: Json = null
    parse(data) match {
      case Left(failure) => println("Invalid JSON :(")
      case Right(json) => json_data = json
    }
    val cursor: HCursor = json_data.hcursor
    println(cursor.downN(1).downField("methods").as[Seq[String]])
    cask.Response(data,
      headers=Seq("Access-Control-Allow-Origin" -> "*",
        "Access-Control-Allow-Headers" -> "Origin, X-Requested-With, Content-Type, Accept",
        "Access-Control-Allow-Methods" -> "GET, POST, PUT, DELETE"))
  }

  @cask.route("/uml", methods = Seq("options"))
  def cors(request: cask.Request) = {
    cask.Response("",
      headers = Seq("Access-Control-Allow-Origin" -> "*",
        "Access-Control-Allow-Headers" -> "Origin, X-Requested-With, Content-Type, Accept",
        "Access-Control-Allow-Methods" -> "GET, POST, PUT, DELETE"))
  }

  initialize()
}
