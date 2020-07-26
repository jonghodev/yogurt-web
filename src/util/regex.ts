// 특수문자 / 문자 / 숫자 포함 형태의 8~15자리 이내의 암호 정규식
export const emailRegex = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// 8 ~ 20 자리
export const usernameRegex = /^(?=[a-zA-Z0-9._]{8,20}$)|(?=[가-힣]{4,8}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

export const nameRegex = /^[가-힣]{2,4}|[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}$/;

export const phoneNumberRegex = /^\d{3}-\d{3,4}-\d{4}$/;
