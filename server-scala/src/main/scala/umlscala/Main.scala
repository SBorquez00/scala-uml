package umlscala

import io.circe._
import io.circe.parser._

import java.io.{BufferedReader, InputStream, InputStreamReader}
import scala.annotation.tailrec

object Main extends cask.MainRoutes {

  private val headers = Seq("Access-Control-Allow-Origin" -> "*",
    "Access-Control-Allow-Headers" -> "Origin, X-Requested-With, Content-Type, Accept",
    "Access-Control-Allow-Methods" -> "GET, POST, PUT, DELETE")

  // Define a function to convert an InputStream to a String
  def inputStreamToString(inputStream: InputStream): String = {
    val reader = new BufferedReader(new InputStreamReader(inputStream))

    val stringBuilder = new StringBuilder()

    @tailrec
    def readData(): Unit = {
      val line = reader.readLine()
      if (line != null) {
        stringBuilder.append(line)
        stringBuilder.append('\n')
        readData()
      }
    }

    readData()

    reader.close()

    stringBuilder.toString()
  }

  def parseJson(data: String): Json = parse(data).getOrElse(Json.Null)

  def convertJsonToObject(jsonList: Json): List[UMLClass] = {
    //create the cursor to iterate over de json
    val cursor: HCursor = jsonList.hcursor
    iterateArrayJson(cursor.downArray, Nil)
  }

  def iterateArrayJson(arrayCursor: ACursor, partialUmlClasses: List[UMLClass]): List[UMLClass] = {
    if (arrayCursor.failed) partialUmlClasses
    else {
      val objectUml = new UMLClass(
        arrayCursor.get[String]("className").getOrElse(""),
        arrayCursor.get[List[String]]("methods").getOrElse(Nil),
        arrayCursor.get[String]("classType").getOrElse("")
      )
      iterateArrayJson(arrayCursor.right, objectUml :: partialUmlClasses)
    }

  }

  @cask.get("/")
  def hello(): String = {
    "Hello World!"
  }

  @cask.route("/uml", methods = Seq("post"))
  def build_code(request: cask.Request): cask.Response[String] = {
    val data: String = inputStreamToString(request.data)
    val jsonData = parseJson(data)
    //This cursor make possible to loop through a Json object
    val umlClasses = convertJsonToObject(jsonData)
    val listClasses: List[String] = umlClasses.map(clase => clase.makeClass())
    cask.Response(listClasses.mkString("\n\n"), headers = headers)
  }

  @cask.route("/uml", methods = Seq("options"))
  def cors(request: cask.Request) = cask.Response("", headers = headers)

  initialize()
}
