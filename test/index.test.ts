import {
  executeTest,
  HTTP_METHOD,
  TestModel,
  TestModelItem
} from '@lzy-plugin/test-util';
import {
  AdminExceptionCodeEnum,
  ExceptionCodeEnum
} from '@lzy-plugin/ddd-cqrs';
import { createApp, close } from '@midwayjs/mock';
import { Framework } from '@midwayjs/web';
import { IMidwayApplication } from '@midwayjs/core';
import { join } from 'path';
const array = new Array<TestModelItem>();
let cookies = [
  'userInfo={"userId":"609c963fccc2fe53dc91e9ac"}; path=/; max-age=3600; expires=Thu, 13 May 2021 04:00:16 GMT; httponly',
  'userInfo.sig=jKBTN8HF5OkKxfB_efRHsL1D-rbmWw2bXfH-sFGNv1c; path=/; max-age=3600; expires=Thu, 13 May 2021 04:00:16 GMT; httponly'
];
array.push(
  {
    name: '接口名:/admins 请求方式:POST 测试内容:使用普通管理员进行注册新的管理员',
    setCookie: cookies,
    path: '/admins',
    method: HTTP_METHOD.POST,
    body: {
      operatorId: '604c7dd6f9a06404506e2548',
      username: 'NewAdmin123',
      password: 'NewAdmin123'
    },
    expectArray: [
      {
        type: 'customExpect',

        callback: (result) => {
          expect(result.status).toBe(500);
        }
      },
      {
        type: 'customExpect',

        callback: (result) => {
          console.log('<<<<<<<<<<<<<<<<<<', result.body);
          expect(result.body.message).toBe('无权限');
        }
      }
    ]
  },
  {
    name: '接口名:/admins 请求方式:POST 测试内容:使用少于6位或超过18位的账号进行注册',
    setCookie: cookies,
    path: '/admins',
    method: HTTP_METHOD.POST,
    body: {
      operatorId: '6049dd95d9d7c324a8ca26da',
      username: '12345',
      password: '123456'
    },
    expectArray: [
      {
        type: 'customExpect',
        callback: (result) => {
          expect(result.status).toBe(500);
        }
      },
      {
        type: 'customExpect',
        callback: (result) => {
          expect(result.body.code).toBe(ExceptionCodeEnum.VALIDATE_FAIL.code);
        }
      }
    ]
  },
  {
    name: '接口名:/admins 请求方式:POST 测试内容:使用少于6位或超过18位的账号进行注册',
    setCookie: cookies,
    path: '/admins',
    method: HTTP_METHOD.POST,
    body: {
      operatorId: '6049dd95d9d7c324a8ca26da',
      username: 'NewAdmin12345678901234567890',
      password: '12345'
    },
    expectArray: [
      {
        type: 'customExpect',

        callback: (result) => {
          expect(result.status).toBe(500);
        }
      },
      {
        type: 'customExpect',

        callback: (result) => {
          expect(result.body.code).toBe(ExceptionCodeEnum.VALIDATE_FAIL.code);
        }
      }
    ]
  },
  {
    name: '接口名:/admins 请求方式:POST 测试内容:使用不包含大写字母、小写字母和数字的账号进行注册',
    setCookie: cookies,
    path: '/admins',
    method: HTTP_METHOD.POST,
    body: {
      operatorId: '6049dd95d9d7c324a8ca26da',
      username: '123456',
      password: '123456'
    },
    expectArray: [
      {
        type: 'customExpect',

        callback: (result) => {
          expect(result.status).toBe(500);
        }
      },
      {
        type: 'customExpect',

        callback: (result) => {
          expect(result.body.code).toBe(ExceptionCodeEnum.VALIDATE_FAIL.code);
        }
      }
    ]
  },
  {
    name: '接口名:/admins 请求方式:POST 测试内容:使用不包含大写字母、小写字母和数字的账号进行注册',
    setCookie: cookies,
    path: '/admins',
    method: HTTP_METHOD.POST,
    body: {
      operatorId: '6049dd95d9d7c324a8ca26da',
      username: 'a123456',
      password: '123456'
    },
    expectArray: [
      {
        type: 'customExpect',

        callback: (result) => {
          expect(result.status).toBe(500);
        }
      },
      {
        type: 'customExpect',

        callback: (result) => {
          expect(result.body.code).toBe(ExceptionCodeEnum.VALIDATE_FAIL.code);
        }
      }
    ]
  },
  {
    name: '接口名:/admins 请求方式:POST 测试内容:使用不包含大写字母、小写字母和数字的账号进行注册',
    setCookie: cookies,
    path: '/admins',
    method: HTTP_METHOD.POST,
    body: {
      operatorId: '6049dd95d9d7c324a8ca26da',
      username: 'A123456',
      password: '123456'
    },
    expectArray: [
      {
        type: 'customExpect',

        callback: (result) => {
          expect(result.status).toBe(500);
        }
      },
      {
        type: 'customExpect',

        callback: (result) => {
          expect(result.body.code).toBe(ExceptionCodeEnum.VALIDATE_FAIL.code);
        }
      }
    ]
  },

  {
    name: '接口名:/admins 请求方式:POST 测试内容:使用已注册的账号进行注册',
    setCookie: cookies,
    path: '/admins',
    method: HTTP_METHOD.POST,
    body: {
      operatorId: '6049dd95d9d7c324a8ca26da',
      username: 'Admin123',
      password: 'Admin123'
    },
    expectArray: [
      {
        type: 'customExpect',

        callback: (result) => {
          expect(result.status).toBe(500);
        }
      },
      {
        type: 'customExpect',

        callback: (result) => {
          expect(result.body.code).toBe(
            ExceptionCodeEnum.DB_FAIL_CREATE_UNIQUE.code
          );
        }
      }
    ]
  },
  {
    name: '接口名:/admins 请求方式:POST 测试内容:使用少于6位或超过18位的密码进行注册',
    setCookie: cookies,
    path: '/admins',
    method: HTTP_METHOD.POST,
    body: {
      operatorId: '6049dd95d9d7c324a8ca26da',
      username: 'NewAdmin123',
      password: '12345'
    },
    expectArray: [
      {
        type: 'customExpect',

        callback: (result) => {
          expect(result.status).toBe(500);
        }
      },
      {
        type: 'customExpect',

        callback: (result) => {
          expect(result.body.code).toBe(ExceptionCodeEnum.VALIDATE_FAIL.code);
        }
      }
    ]
  },
  {
    name: '接口名:/admins 请求方式:POST 测试内容:使用少于6位或超过18位的密码进行注册',
    setCookie: cookies,
    path: '/admins',
    method: HTTP_METHOD.POST,
    body: {
      operatorId: '6049dd95d9d7c324a8ca26da',
      username: 'NewAdmin123',
      password: 'NewAdmin12345678901234567890'
    },
    expectArray: [
      {
        type: 'customExpect',

        callback: (result) => {
          expect(result.status).toBe(500);
        }
      },
      {
        type: 'customExpect',

        callback: (result) => {
          expect(result.body.code).toBe(ExceptionCodeEnum.VALIDATE_FAIL.code);
        }
      }
    ]
  },

  {
    name: '接口名:/admins 请求方式:POST 测试内容:使用不包含大写字母、小写字母和数字的密码进行注册',
    setCookie: cookies,
    path: '/admins',
    method: HTTP_METHOD.POST,
    body: {
      operatorId: '6049dd95d9d7c324a8ca26da',
      username: 'NewAdmin123',
      password: '123456'
    },
    expectArray: [
      {
        type: 'customExpect',

        callback: (result) => {
          expect(result.status).toBe(500);
        }
      },
      {
        type: 'customExpect',

        callback: (result) => {
          expect(result.body.code).toBe(ExceptionCodeEnum.VALIDATE_FAIL.code);
        }
      }
    ]
  },

  {
    name: '接口名:/admins 请求方式:POST 测试内容:使用不包含大写字母、小写字母和数字的密码进行注册',
    setCookie: cookies,
    path: '/admins',
    method: HTTP_METHOD.POST,
    body: {
      operatorId: '6049dd95d9d7c324a8ca26da',
      username: 'NewAdmin123',
      password: 'a12345'
    },
    expectArray: [
      {
        type: 'customExpect',

        callback: (result) => {
          expect(result.status).toBe(500);
        }
      },
      {
        type: 'customExpect',

        callback: (result) => {
          expect(result.body.code).toBe(ExceptionCodeEnum.VALIDATE_FAIL.code);
        }
      }
    ]
  },

  {
    name: '接口名:/admins 请求方式:POST 测试内容:使用不包含大写字母、小写字母和数字的密码进行注册',
    setCookie: cookies,
    path: '/admins',
    method: HTTP_METHOD.POST,
    body: {
      operatorId: '6049dd95d9d7c324a8ca26da',
      username: 'NewAdmin123',
      password: 'A12345'
    },
    expectArray: [
      {
        type: 'customExpect',

        callback: (result) => {
          expect(result.status).toBe(500);
        }
      },
      {
        type: 'customExpect',

        callback: (result) => {
          expect(result.body.code).toBe(ExceptionCodeEnum.VALIDATE_FAIL.code);
        }
      }
    ]
  },

  {
    name: '接口名:/admins 请求方式:POST 测试内容:使用包含特殊字符的账号进行注册',
    setCookie: cookies,
    path: '/admins',
    method: HTTP_METHOD.POST,
    body: {
      operatorId: '6049dd95d9d7c324a8ca26da',
      username: 'NewAdmin123@',
      password: 'Abc123456'
    },
    expectArray: [
      {
        type: 'customExpect',

        callback: (result) => {
          expect(result.status).toBe(500);
        }
      },
      {
        type: 'customExpect',

        callback: (result) => {
          expect(result.body.code).toBe(ExceptionCodeEnum.VALIDATE_FAIL.code);
        }
      }
    ]
  },
  {
    name: '接口名:/admins 请求方式:POST 测试内容:使用包含特殊字符的密码进行注册',
    setCookie: cookies,
    path: '/admins',
    method: HTTP_METHOD.POST,
    body: {
      operatorId: '6049dd95d9d7c324a8ca26da',
      username: 'NewAdmin123',
      password: 'Abc123456@'
    },
    expectArray: [
      {
        type: 'customExpect',

        callback: (result) => {
          expect(result.status).toBe(500);
        }
      },
      {
        type: 'customExpect',

        callback: (result) => {
          expect(result.body.code).toBe(ExceptionCodeEnum.VALIDATE_FAIL.code);
        }
      }
    ]
  },

  {
    name: '接口名:/admins/actions/login 请求方式:POST 测试内容:账号为空',
    setCookie: cookies,
    path: '/admins/actions/login',
    method: HTTP_METHOD.POST,
    body: {
      username: '',
      password: 'Abc123456@'
    },
    expectArray: [
      {
        type: 'customExpect',

        callback: (result) => {
          expect(result.status).toBe(500);
        }
      },
      {
        type: 'customExpect',

        callback: (result) => {
          expect(result.body.code).toBe(ExceptionCodeEnum.VALIDATE_FAIL.code);
        }
      }
    ]
  },
  {
    name: '接口名:/admins/actions/login 请求方式:POST 测试内容:密码为空',
    setCookie: cookies,
    path: '/admins/actions/login',
    method: HTTP_METHOD.POST,
    body: {
      username: 'NewAdmin123',
      password: ''
    },
    expectArray: [
      {
        type: 'customExpect',

        callback: (result) => {
          expect(result.status).toBe(500);
        }
      },
      {
        type: 'customExpect',

        callback: (result) => {
          expect(result.body.code).toBe(ExceptionCodeEnum.VALIDATE_FAIL.code);
        }
      }
    ]
  },
  {
    name: '接口名:/admins/actions/login 请求方式:POST 测试内容:使用账号不存在',
    setCookie: cookies,
    path: '/admins/actions/login',
    method: HTTP_METHOD.POST,
    body: {
      username: 'NotAdmin123',
      password: 'NewAdmin123'
    },
    expectArray: [
      {
        type: 'customExpect',

        callback: (result) => {
          expect(result.status).toBe(500);
        }
      },
      {
        type: 'customExpect',

        callback: (result) => {
          expect(result.body.code).toBe(
            AdminExceptionCodeEnum.ADMIN_USERNAME_NOT_EXIST.code
          );
        }
      }
    ]
  },
  {
    name: '接口名:/admins/actions/login 请求方式:POST 测试内容:密码错误',
    setCookie: cookies,
    path: '/admins/actions/login',
    method: HTTP_METHOD.POST,
    body: {
      username: 'Admin123',
      password: 'Admin1234'
    },
    expectArray: [
      {
        type: 'customExpect',

        callback: (result) => {
          expect(result.status).toBe(500);
        }
      },
      {
        type: 'customExpect',

        callback: (result) => {
          expect(result.body.code).toBe(
            AdminExceptionCodeEnum.ADMIN_PASSWORD_ERROR.code
          );
        }
      }
    ]
  },
  {
    name: '接口名:/admins/actions/login 请求方式:POST 测试内容:使用被禁用的账号',
    setCookie: cookies,
    path: '/admins/actions/login',
    method: HTTP_METHOD.POST,
    body: {
      username: 'Admin123',
      password: 'Admin123'
    },
    expectArray: [
      {
        type: 'customExpect',

        callback: (result) => {
          expect(result.status).toBe(500);
        }
      },
      {
        type: 'customExpect',

        callback: (result) => {
          expect(result.body.code).toBe(
            AdminExceptionCodeEnum.ADMIN_DISENABLE.code
          );
        }
      }
    ]
  }
);

const testModel: TestModel = {
  name: '管理员功能模块',
  array: array
};

executeTest(testModel, {
  async beforeAll(): Promise<IMidwayApplication> {
    //创建app实例
    let app = await createApp(
      join(__dirname, 'fixtures', 'base-app'),
      {},
      Framework
    );
    return app;
  },
  async afterAll(app: IMidwayApplication) {
    //关闭app实例
    await close(app);
  }
}); //执行测试
