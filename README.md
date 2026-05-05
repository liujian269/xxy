# 胥新元全国老药工传承工作室专题网站

这是一个纯静态专题网站，可部署到任意静态托管服务，例如 GitHub Pages、Netlify、Vercel、Cloudflare Pages、对象存储静态网站或医院现有 Web 服务器。

## 页面清单

- `index.html`：首页
- `about.html`：工作室概况
- `profile.html`：传承人风采，使用 `assets/images/profile.jpg`
- `heritage.html`：技艺传承
- `news.html`：工作动态列表
- `news-1.html`：调研交流新闻详情
- `news-2.html`：四季养生膏获奖新闻详情
- `training.html`：教学培训
- `achievements.html`：成果展示
- `science.html`：科普园地
- `contact.html`：联系我们与反馈意见

## 本地预览

可直接双击 `index.html` 预览。为了避免浏览器对本地脚本或跨域资源的限制，也可以在项目目录启动一个静态服务：

```bash
python -m http.server 8080
```

然后访问：

```text
http://localhost:8080
```

## EmailJS 配置

反馈表单采用纯前端 EmailJS 方式发送邮件，不需要后端服务。

1. 注册并登录 EmailJS。
2. 新建 Email Service，获取 `serviceId`。
3. 新建 Email Template，获取 `templateId`。
4. 在 Account / API Keys 中获取 `publicKey`。
5. 修改 `assets/js/email.config.js`：

```js
window.EMAILJS_CONFIG = {
  publicKey: "YOUR_EMAILJS_PUBLIC_KEY",
  serviceId: "YOUR_EMAILJS_SERVICE_ID",
  templateId: "YOUR_EMAILJS_TEMPLATE_ID",
  toEmail: "target@example.com"
};
```

将 `toEmail` 替换为指定收件邮箱。

EmailJS 模板建议使用以下变量：

```text
{{from_name}}
{{from_email}}
{{phone}}
{{subject}}
{{message}}
{{to_email}}
{{page_url}}
```

## 静态部署

将以下文件和目录整体上传到静态托管服务根目录：

```text
*.html
assets/
README.md
```

如果部署在子路径下，当前页面链接仍可正常工作，因为站点使用相对路径。

## 内容安全提示

- 不要在页面中写入真实患者信息、病历、处方或个人身份信息。
- EmailJS 公钥可以放在前端，但邮箱服务、模板权限和收件规则应在 EmailJS 后台限制。
- 公开页面只展示一般性、教学性和科普性内容；核心处方、工艺参数和企业合作资料不公开。
