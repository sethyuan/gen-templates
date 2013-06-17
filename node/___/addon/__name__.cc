#include <node.h>

using namespace v8;

Handle<Value> CreateModule(const Arguments &args) {
  HandleScope scope;

  return scope.Close(Undefined());
}

void Init(Handle<Object> exports, Handle<Object> module) {
  exports->Set(String::NewSymbol("{{{name}}}"),
      FunctionTemplate::New(CreateModule)->GetFunction());
}

NODE_MODULE({{{name}}}, Init)
