const regexOptions = {
  patterns: {
    email: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    number: /^[0-9]*$/,
    decimal: /^(\d+\.?\d*|\.\d+)$/,
    password: /^[\w-!@#$%^&*(),.;?":{}|<>+/=\[\]\'\\~`]{8,128}$/gi,
    hiragana: /^[ぁ-ゔー　 ]+$/,
    fullWidth: /^[^\x01-\x7E\xA1-\xDF]+$/,
    phone: /^[0-9-]*$/
  }
};

export default regexOptions;
