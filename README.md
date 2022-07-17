## 部署方式

## 本地构建
```javascript
npm build
```

## 执行工作流
[actions](https://github.com/linyuan1105/MyWebSite/actions)


![](./document/img/img.png)

## docker部署

```javascript
// 查看容器
docker ps  

// 关闭容器
docker stop <CONTAINER ID>

// 更新内容
docker pull  673609957/my-website

//运行容器
docker run -dp 80:80 673609957/my-website

```
![](./document/img/img_2.png)


##  问题
>  如何构建[docker_nginx](https://hub.docker.com/_/nginx);
需要利用docker构建nginx，构建完成后再进行部署，在处理一些列的问题。
