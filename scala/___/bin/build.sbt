organization := "{{{group}}}"

name := "{{{name}}}"

version := "0.1.0"

description := "{{{desc}}}"

licenses := Seq(("MIT" -> url("http://mit-license.org")))

homepage := Some(url("https://github.com/{{{user.name}}}/{{{name}}}"))

scalaVersion := "2.10.4"

resolvers ++= Seq(
  "Sonatype Snapshots" at "http://oss.sonatype.org/content/repositories/snapshots",
  "Sonatype Releases" at "http://oss.sonatype.org/content/repositories/releases"
)

// libraryDependencies ++= Seq()

// fork in run := true

// javaOptions := Seq("")

scalacOptions ++= Seq(
  "-target:jvm-1.7",
  "-optimize",
  "-deprecation",
  "-feature",
  "-Xlint",
  "-Xlog-reflective-calls"
)
