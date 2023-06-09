(() => {
    let currentIndex = 1;

    /**
     * 绑定事件
     */
    function bindEvents() {
        let prevDiv = document.querySelector("div.prev");
        let nextDiv = document.querySelector("div.next");
        let homeDiv = document.querySelector("div.home");
        let loginMaskDiv = document.querySelector("div.login-mask");
        let usernameInput = loginMaskDiv.querySelector("input#username");
        let passwordInput = loginMaskDiv.querySelector("input#password");
        let loginBtn = loginMaskDiv.querySelector("input#btn-login");
        loginBtn.onclick = function () {
            if (
                usernameInput.value == "root" &&
                passwordInput.value == "huafua"
            ) {
                loginMaskDiv.classList.add("success");
            }
        };
        prevDiv.onclick = function () {
            if (currentIndex > 1) fetchBooks(--currentIndex);
        };
        nextDiv.onclick = function () {
            fetchBooks(++currentIndex);
        };
        homeDiv.onclick = function () {
            fetchBooks(1);
        };
    }
    /**
     * 根据指定页码获取到对应的小说列表
     * @param {int} pageIndex 页码
     */
    function fetchBooks(pageIndex) {
        currentIndex = pageIndex;
        localStorage.setItem("page", pageIndex);
        let pageSize = 20;
        let novelListDiv = document.querySelector("div.novel-list");
        let loadingDiv = document.createElement("div");
        loadingDiv.className = "loading";
        novelListDiv.appendChild(loadingDiv);
        fetch("/data.json")
            .then((response) => response.json())
            .then((data) => {
                let files = data.files;
                if (files.length <= 0) {
                    return;
                }
                let novels = data.files.splice(
                    (pageIndex - 1) * pageSize,
                    pageSize
                );
                if (novels.length <= 0) {
                    currentIndex = pageIndex - 1;
                    loadingDiv.remove();
                    return;
                }
                novelListDiv.innerHTML = "";
                novels.forEach((novelItem) => {
                    let itemDiv = document.createElement("div");
                    itemDiv.innerHTML = novelItem.name;
                    itemDiv.className = "novel-item";
                    itemDiv.onclick = function () {
                        showNovel(novelItem);
                    };
                    novelListDiv.appendChild(itemDiv);
                });
            });
    }

    /**
     *展示小说
     * @param {{name:string,filepath:string}} novelItem 小说对象，包含小说名和路径
     */
    function showNovel(novelItem) {
        let novelDisplay = document.createElement("div");
        novelDisplay.style.zIndex = 100;
        novelDisplay.style.backgroundColor = "white";
        novelDisplay.className = "novel-container";
        let novelTitleDiv = document.createElement("div");
        novelTitleDiv.className = "novel-title";
        novelTitleDiv.innerHTML = novelItem.name;
        let close = document.createElement("div");
        close.className = "close";
        close.innerHTML = "&lt;";
        close.onclick = function () {
            novelDisplay.remove();
            novelDisplay = null;
        };
        novelTitleDiv.appendChild(close);
        novelDisplay.appendChild(novelTitleDiv);
        let novelContentDiv = document.createElement("div");
        novelContentDiv.className = "novel-content";

        novelDisplay.appendChild(novelContentDiv);
        let loadingDiv = document.createElement("div");
        loadingDiv.className = "loading";
        novelContentDiv.appendChild(loadingDiv);
        document.body.appendChild(novelDisplay);
        fetch(novelItem.filepath)
            .then((response) => response.text())
            .then((data) => {
                novelContentDiv.innerHTML = data;
            });
    }
    bindEvents();
    let pageIndex = localStorage.getItem("page");
    if (pageIndex) {
        pageIndex = parseInt(pageIndex);
    } else {
        pageIndex = 1;
    }
    fetchBooks(pageIndex);
})();
