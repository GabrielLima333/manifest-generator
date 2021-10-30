uuidv4 = function() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random() * 16 | 0,
		v = c == 'x' ? r: (r & 0x3 | 0x8);
		return v.toString(16);
	});
};

code = function() {
var code = `
{
	"format_version": 2,
	"header": {
		"name": "${document.getElementById("name").value}",
		"description": "${document.getElementById("description").value}",
		"uuid": "${uuidv4()}",
		"version": [${document.getElementById("version").value}],
		"min_engine_version": [1, 16, 0]
	},
	"modules": [
		{
			"type": "${(document.getElementById("type").value)}",
			"uuid": "${uuidv4()}",
			"version": [${document.getElementById("version").value}]
		}
	]
}
`;
}

document.getElementById("generate").addEventListener("click", () => {
	document.getElementById("output").value = code();
});

document.getElementById("copyToClipboard").addEventListener("click", () => {
	document.getElementById("output").select();
	document.getElementById("output").setSelectionRange(0, document.getElementById("output").value.length);
	document.execCommand("copy");
});

document.getElementById("downloadFile").addEventListener("click", () => {
	var f = document.getElementById("output").value;
	f = new Blob([f], {
		type: "text/plain;charset=utf-8"
	});
	var c = document.createElement("a");
	c.download = "manifest.json";
	c.innerHTML = "Save";
	null != window.webkitURL ? c.href = window.webkitURL.createObjectURL(f): (c.href = window.URL.createObjectURL(f), c.onclick = destroyClickedElement, c.style.display = "none", document.body.appendChild(c));
	c.click();
});