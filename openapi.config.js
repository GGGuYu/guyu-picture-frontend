import { generateService } from '@umijs/openapi'

// 生成接口代码的一个配置，

generateService({
  requestLibPath: "import request from '@/request'", // 找我们自己定义的request
  schemaPath: 'http://localhost:8123/api/v2/api-docs', // 接口文档
  serversPath: './src', //存放地址
})
