<script lang="ts">
    import { onMount } from "svelte";

    let question = "";
    let answer = "";
    let apiKey = "";

    function fetchText() {
        // send message to the extension asking for the selected text
        tsvscode.postMessage({ type: "onFetchText", value: "" });
    }

    function askAi() {
        // send message to the extension asking your question
        tsvscode.postMessage({ type: "onAskAi", value: { question, apiKey } });
    }

    onMount(() => {
        // Listen for messages from the extension
        window.addEventListener("message", (event) => {
            const message = event.data;
            switch (message.type) {
                case "onSelectedText": {
                    question = message.value;
                    break;
                }
                case "onAnswerText": {
                    answer = message.value;
                    break;
                }
            }
        });
    });
</script>

<h1>Ask Bot</h1>

<label for="text"><b>OPEN API KEY:</b></label>
<input type="password" bind:value={apiKey} />

<label for="text"><b>SHOOT IT</b></label>
<textarea
    rows="15"
    id="text"
    style="resize: vertical;"
    minlength="30"
    bind:value={question}
/>
<button on:click={fetchText}>fetch text</button>
<button on:click={askAi}>Ask</button>

<span>{answer}</span>
