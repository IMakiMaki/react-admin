export interface DtoVerifyCode {
  userName?: string;
  t?: number;
}
export interface DtoLogin {
  accountType: DtoAccountType;
  userName: string;
  passWord: string;
  imgCode: string;
}

export interface DtoLoginSuccess {
  permission: string;
  token: string;
  user: {
    accountType: DtoAccountType;
    companyName: string;
    fuserId: number;
    statusFlag: DtoStatusFlag;
    userId: number;
    userName: string;
  };
}

export const AccountType = {
  '0': '直客',
  '1': '代理商',
  '2': '广告主',
  '3': '核代',
};

// 审核状态
export const StatusFlag = {
  '0': '未上传资质证书',
  '1': '待审核',
  '2': '审核未通过',
  '3': '审核通过',
};

// 账号类型key
export type DtoAccountType<T = typeof AccountType> = keyof T;

export type DtoStatusFlag<T = typeof StatusFlag> = keyof T;
