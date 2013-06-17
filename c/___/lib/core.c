#include "core.h"

void *{{{prefix}}}_malloc(size_t size) {
  void *ptr = malloc(size);
  if (ptr == NULL) {
    fprintf(stderr, "Out of memory!\n");
    exit(1);
  }
  return ptr;
}
