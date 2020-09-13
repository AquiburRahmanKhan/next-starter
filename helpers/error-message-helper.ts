/**
 * Get appropriate error message
 * @param validatorName
 * @param validatorValue
 * @param customMessages
 */
const getErrorMessage = (
  validatorName: string,
  validatorValue?: any,
  customMessages?: any
) => {
  const customMsg = customMessages !== undefined ? customMessages : {};
  const config = {
      email: customMsg.email
          ? customMsg.email
          : "メールアドレスが正しくありません",

      required: customMsg.required
          ? customMsg.required
          : "必須項目です",

      min: customMsg.min
          ? customMsg.min
          : `文字が短すぎます（${validatorValue?.min}文字以上）`,

      max: customMsg.max
          ? customMsg.max
          : `文字が長すぎます(${validatorValue?.max}文字以内)`,

      pattern: customMsg.pattern
          ? customMsg.pattern
          : "使用できない文字が含まれています",

      equalTo: customMsg.equalTo
          ? customMsg.equalTo
          : '入力に誤りがあります',


  }

  return config[validatorName]
}


export default getErrorMessage;
