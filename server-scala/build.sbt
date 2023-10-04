ThisBuild / version := "0.1.0-SNAPSHOT"

ThisBuild / scalaVersion := "2.13.11"

lazy val root = (project in file("."))
  .settings(
    name := "server-scala"
  )

libraryDependencies += "com.lihaoyi" %% "cask" % "0.9.1"
libraryDependencies += "org.scalameta" %% "scalameta" % "4.8.10"

val circeVersion = "0.14.1"

libraryDependencies ++= Seq(
  "io.circe" %% "circe-core",
  "io.circe" %% "circe-generic",
  "io.circe" %% "circe-parser"
).map(_ % circeVersion)