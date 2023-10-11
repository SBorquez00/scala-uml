package umlscala

class UMLClass(val name: String, val methods: List[String], val classType: String) {

  def print(): Unit = {
    println(s"Nombre: ${name} \n Metodos:${methods.mkString("\n")}")
  }

  def makeClass(): String = {
    val header: String = if (classType=="class") {
      s"class ${name}() {"
    } else if (classType=="trait"){
      s"trait ${name} {"
    } else{
      s"abstract class ${name} {"
    }
    val methodsStruct: List[String] = if (classType=="trait") {
      methods.map(method => s"\n  def ${method}")
    } else{
      methods.map(method => s"\n  def ${method} = {\n    ???\n  }")
    }
    header + methodsStruct.mkString + "\n}"
  }
}
