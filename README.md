# 简单项目

## 1. 准备数据

-   1.1 将小说文件(`*.html`)复制到`novels`目录中，无该目录请自行创建，

-   1.2 执行`node generate.js`，以生成项目所需的数据文件`data.json`
    该脚本的作用是读取`novels`目录中的文件列表，并生成如下结构的数据

    ```json
    {
        "files": [
            {
                "name": "xxx",
                "filepath": "./novels/xxx.html"
            }
        ]
    }
    ```

## 2. 部署

将下述文件及文件夹部署到静态服务器即可

```txt
|- novels
    |- xxx.html
    |- yyy.html
|- data.json
|- generate.js
|- index.css
|- index.html
|- index.js
|- README.md
```

## 3. 测试

使用浏览器打开地址就行了
