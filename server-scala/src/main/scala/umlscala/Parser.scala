package umlscala

import scala.meta._

object Parser {

  def main(args: Array[String]) = {
    val program = q"""object Main { val hola: String = "Hola!" }"""
    val tree = program.traverse {
      case node =>
        println(s"${node.productPrefix}: $node")
    }

  }

}
