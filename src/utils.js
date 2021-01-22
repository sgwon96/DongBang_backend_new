import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });
import { adjectives, nouns } from "./words";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";
import jwt from "jsonwebtoken";


export const generateSecret = () => {
    const randomNumber = Math.floor(Math.random() * adjectives.length);
    return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
  };
 
  const sendMail = email => {
    const options = {
      auth: {
        api_key: process.env.SENDGRID_API_KEY
      }
    };
    const client = nodemailer.createTransport(sgTransport(options));
    return client.sendMail(email);
  };
 
  export const sendSecretMail = (adress, secret) => {
    const site_title_top = "동방";
    const site_title_content = "동방";
    const point_color = "#FF7300";
    const email = {
      from: "zxcvb5434@likelion.org",
      to: adress,
      subject: "동방 메일 인증 안내입니다.",
      html: `
      <div style="font-family: 'Apple SD Gothic Neo', 'sans-serif'; width: 540px; height: 600px; border-top: 4px solid ${point_color}; margin: 100px auto; padding: 30px 0; box-sizing: border-box;">
	<h1 style="margin: 0; padding: 0 5px; font-size: 28px; font-weight: 400;">
		<span style="font-size: 15px; margin: 0 0 10px 3px;">${site_title_top}</span><br />
		<span style="color: ${point_color};">메일인증</span> 안내입니다.
	</h1>
	<p style="font-size: 16px; line-height: 26px; margin-top: 50px; padding: 0 5px;">
		안녕하세요.<br />
		${site_title_content}에 가입해 주셔서 진심으로 감사드립니다.<br />
		아래 <b style="color: ${point_color};">'인증 코드'</b> 를 복사한 뒤, 회원 가입창에 입력해주세요.<br />
		감사합니다.
	</p>

	<p style="font-size: 16px; margin: 40px 5px 20px; line-height: 28px;">
		인증 코드: <br />
		<span style="font-size: 24px;">${secret}</span>
	</p>

	<div style="border-top: 1px solid #DDD; padding: 5px;">
	</div>
</div>
      `
    };
    return sendMail(email);
  };

  export const sendPasswordMail = (adress, secret) => {
    const site_title_top = "동방";
    const site_title_content = "동방";
    const point_color = "#FF7300";
    const email = {
      from: "zxcvb5434@likelion.org",
      to: adress,
      subject: "동방 메일 인증 안내입니다.",
      html: `
      <div style="font-family: 'Apple SD Gothic Neo', 'sans-serif'; width: 540px; height: 600px; border-top: 4px solid ${point_color}; margin: 100px auto; padding: 30px 0; box-sizing: border-box;">
	<h1 style="margin: 0; padding: 0 5px; font-size: 28px; font-weight: 400;">
		<span style="font-size: 15px; margin: 0 0 10px 3px;">${site_title_top}</span><br />
		<span style="color: ${point_color};">메일인증</span> 안내입니다.
	</h1>
	<p style="font-size: 16px; line-height: 26px; margin-top: 50px; padding: 0 5px;">
		안녕하세요.<br />
		비밀번호를 찾기 위한 인증 메일입니다.<br />
		아래 <b style="color: ${point_color};">'인증 코드'</b> 를 복사한 뒤, 인증코드칸에 입력해주세요.<br />
		감사합니다.
	</p>

	<p style="font-size: 16px; margin: 40px 5px 20px; line-height: 28px;">
		인증 코드: <br />
		<span style="font-size: 24px;">${secret}</span>
	</p>

	<div style="border-top: 1px solid #DDD; padding: 5px;">
	</div>
</div>
      `
    };
    return sendMail(email);
  };


  export const sendNotificationMail = (adress, club, url) => {
    const site_title_top = "동방";
    const site_title_content = "동방";
    const point_color = "#FF7300";
    const email = {
      from: "zxcvb5434@likelion.org",
      to: adress,
      subject: `"${club}에서 메세지를 보냈습니다."`,
      html: `
      <div style="font-family: 'Apple SD Gothic Neo', 'sans-serif'; width: 540px; height: 600px; border-top: 4px solid ${point_color}; margin: 100px auto; padding: 30px 0; box-sizing: border-box;">
	<h1 style="margin: 0; padding: 0 5px; font-size: 28px; font-weight: 400;">
		<span style="font-size: 15px; margin: 0 0 10px 3px;">${site_title_top}</span><br />
		<span style="color: ${point_color};">${club}</span>에서 메세지를 보냈습니다.
	</h1>
	<p style="font-size: 16px; line-height: 26px; margin-top: 50px; padding: 0 5px;">
		안녕하세요.<br />
		${club}에 지원해 주셔서 진심으로 감사드립니다.<br />
	  1차 서류 전형에 합격하셨습니다. 자세한 사항은 메세지함에서 확인하세요<br />
		감사합니다.
	</p>

	<p style="font-size: 16px; margin: 40px 5px 20px; line-height: 28px;">
		사이트: <br />
		<span style="font-size: 24px;"><a style="href="${url}" target="_blank">${url}</a></span>
	</p>

	<div style="border-top: 1px solid #DDD; padding: 5px;">
	</div>
</div>
      `
    };
    return sendMail(email);
  };


export const generateToken = id => jwt.sign({ id }, process.env.JWT_SECRET);