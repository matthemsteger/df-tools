export function createStreamStub(sandbox) {
	return {
		pipe: sandbox.stub().returnsThis(),
		collect: sandbox.stub().returnsThis()
	};
}

export function createFsStubModule(sandbox) {
	const stream = createStreamStub(sandbox);
	return {
		createReadStream: sandbox.stub().returns(stream),
		Stream: stream
	};
}
