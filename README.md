# blockly_games_advanced

## 介绍

[Blockly Games](https://blockly.games/)作为一款免费面向大众的应用，以其简单的使用方式、清晰的界面逻辑与完整的流程体验为人们所称赞，许多学校会以Blockly Games作为计算机第一堂课的引入工具，激发学生们对于课程的兴趣。

然而，由于不同国家对于[儿童保护](https://groups.google.com/g/blockly-games/c/buQOX5q-pGU)的法律条规不一，Google并没有为Blockly Games提供“用户机制”。这为教学带来的很多不便，学生的进度与完成情况没有统一的收集机制，不利于老师更充分的了解学生的学习情况；在每个人都拥有多个设备的今天，没有账号机制很难在多个设备间保持进度的同步；Blockly Games本身没有提供吸引孩子完成关卡，优化关卡，不断深化学习的机制。

鉴于以上因素，本项目致在为Blockly Games做一些加强，弥补目前的不足。

[体验链接](http://f8h.cn/DETVE)

## 软件架构

本项目借鉴了[v-login](https://github.com/DFairy/v-login-page)，使用前后端分离的架构

1. Vue2作为前端框架，实现登陆注册页面，以及对Blockly Games的封装
2. Node Express作为后端框架，接收前端发送的请求，并负责与数据库交互
3. MongoDB作为存储用户信息与关卡进度的仓储

## 安装教程

1.  安装环境：
    
    - 建议使用NodeJS 16 lts版本，使用下述命令更新NodeJS源：`curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -`
    - `sudo apt-get update && sudo apt-get install -y mongodb nodejs`

2.  克隆仓库：`git clone https://github.com/Morphlng/blockly_games_advanced.git`
3.  进入根目录：`cd blockly_games_advanced`
4.  安装前端依赖：`npm install`
5.  安装后端依赖：`cd server && npm install`
6.  根据[public/blockly_games/Readme.md](public/blockly_games/Readme.md)的指南，下载并解压blockly-games原始文件到指定目录

> 注：使用国内网络安装前端npm依赖时，可能会遇到Cypress安装失败的问题。
> 
> 1. 如果你是生产用户，请在package.json中删除"@vue/cli-plugin-e2e-cypress"与"cypress-localstorage-commands"两个依赖后重新安装。另外，你需要在`.eslintrc.js`的"extensions"中删除cypress相关的插件。
> 
> 2. 如果你是开发者，可以从[百度网盘](https://pan.baidu.com/s/1NEe8jVrpCaYhkWV94ns6Bw?pwd=eulx)（提取码：eulx）下载离线版本（提供的是Linux x86_64版本，其他版本请参照该[说明](https://www.bilibili.com/read/cv14322137)下载），然后设置环境变量`export CYPRESS_INSTALL_BINARY="{path_to}/cypress.zip"`即可

## 使用说明

1. 共有两处在部署时需要修改：

    - 前端：`src/api/url.js`中，请将production对应的地址改为你后端服务器的：{ip/域名}:{端口}
    - 后端：`server/bin/config.js`中，请按照提示修改所有服务相关的地址、端口等信息
    > 对开发而言，除邮箱信息以外均可保留

1. 回到根目录：`cd blockly_games_advanced`
2. 启动前端：`npm run serve`
3. 启动后端：`cd server && npm run start`

> 注：前后端需要在不同shell中启动，或使用nohup、&等命令后台启动

## 参与贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request