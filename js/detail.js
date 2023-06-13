(() => {
    window.onload = function () {
        let novelContentDiv = document.querySelector("div.novel-content");
        let novelTitleDiv = document.querySelector("div.novel-title");

        let params = new URLSearchParams(location.search);
        let title = params.get("title");
        let filepath = params.get("filepath");
        if (!title || !filepath) {
            novelTitleDiv.innerHTML = "參數無效";
            novelContentDiv.innerHTML = "參數無效";
            return;
        }
        fetch(filepath)
            .then((response) => {
                if (response.status == 200) return response.text();
                console.log(response.status);
                return "<h1 class='not-found'>未找到資源</h1>";
            })
            .then((data) => {
                novelTitleDiv.innerHTML = title;
                novelContentDiv.innerHTML = data;
            });
    };
})();
