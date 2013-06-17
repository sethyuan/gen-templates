#ifndef {{{prefix}}}_CORE_H_
#define {{{prefix}}}_CORE_H_

#ifdef __cplusplus
#define BEGIN_DECLS extern "C" {
#define END_DECLS }
#else
#define BEGIN_DECLS
#define END_DECLS
#endif

void *{{{prefix}}}_malloc(size_t size);

#endif
