* what xpcshell is
* what an xpcshell test looks like
* mostly io bound, multi core machines => waste
* how the harness works, let's paralellize the harness - should be easy
* forgot about the tests
* static ports, shared dirs, static files, alteration of shared state
* end up waiting on review and needinfo from people all over the tree
(and the world)
* many times it's not trivial - i.e. static files, or broken api (unsined
port as -1)
* it worked, speedups found (some graph)
* you encounter weird stuff - windows filesystem, intermittent failures,
some across different platforms at the same time etc.
* future work (enable in automation)
* parallelize more stuff (nfroyd working on reftest)
