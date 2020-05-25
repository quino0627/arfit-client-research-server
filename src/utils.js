import { adjectives, nouns } from './words';
import nodemailer from 'nodemailer';
import sgTransport from 'nodemailer-sendgrid-transport';
import jwt from 'jsonwebtoken';

// 비밀번호 생성 함수
export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);

  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

//
//
const sendMail = email => {
  const options = {
    auth: {
      api_user: process.env.SENDGRID_USERNAME,
      api_key: process.env.SENDGRID_PASSWORD,
    },
  };
  const client = nodemailer.createTransport(sgTransport(options));
  return client.sendMail(email);
};

export const sendSecretMail = (address, secret) => {
  const email = {
    from: 'arfit.dev@allnewfit.net',
    to: address,
    subject: 'Login Secret from ARFIT 🔒',
    html: `hello, your secret is <strong>${secret}<strong/> <br/> 복붙해서 붙여넣기`,
  };
  return sendMail(email);
};

export const generateToken = loginSecret =>
  jwt.sign({ loginSecret }, process.env.JWT_SECRET);

export const convertCodeToExercise = code => {
  // 테스트용
  if (code === 'apple') return 1;
  if (code === 'galaxy') return 2;
  if (code === 'ipad') return 3;
  if (code === 'iphone') return 4;
  else return null;

  // 5월 10일 용
  // 5월 11일 용
  // 5월 12일 용
};
