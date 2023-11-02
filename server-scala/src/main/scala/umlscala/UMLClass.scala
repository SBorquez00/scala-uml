package umlscala

class UMLClass(val name: String, val methods: List[String], val classType: String, val classTarget: String) {

  def print(): Unit = {
    println(s"Nombre: ${name} \n Metodos:${methods.mkString("\n")}")
  }

  def makeClass(): String = {
    val header: String = if (classType=="class") {
      if(classTarget=="-1"){
        s"class ${name}() {"
      } else{
        s"class ${name}() extends ${classTarget} {"
      }
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
