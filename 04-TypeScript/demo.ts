// 例子1: 写业务，类型拆分解耦

// 有一个需求：做一个答题 PK 小程序问答记录排行榜的时候

// 问题记录interface定义

interface IQuestionRecord {
  createTime: string;
  userName: string;
  userAvatar: string;
  question: {
    title: string;
    content: string;
    picture: string[];
  };
}

// 答题记录interface定义

interface IAnswerRecord {
  createTime: string;
  userName: string;
  userAvatar: string;
  answer: {
    comment: string;
    audio?: {
      url: string;
    };
  };
}

// 以上两个接口中有重复定义的，可以拆分一下

interface IUserBaseInfo {
  createTime: string;
  userName: string;
  userAvatar: string;
}
interface IQuestionRecord {
  question: {
    title: string;
    content: string;
    picture: string[];
  };
}
interface IAnswerRecord {
  answer: {
    comment: string;
    audio?: {
      url: string;
    };
  };
}

// 使用交叉类型进行接口混入

type Mixin<T, X> = {
  [P in keyof (T & X)]: (T & X)[P]
}

// 更简单的写法
type Minxin<T, X> = T & X

type MixinUserBaseInfo<T> = Minxin<IUserBaseInfo, T>

interface IRecordConfig {
  qustion?: MixinUserBaseInfo<IQuestionRecord>
  answer?: MixinUserBaseInfo<IAnswerRecord>
}

export type RecordConfigList = IRecordConfig[]

var name: string = ''
