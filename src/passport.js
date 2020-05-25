// passport는 인증 관련한 모든 일을 한다.
import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PrismaClient } from '@prisma/client';

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

// 토큰이 추출되면 verifyUser를 실행한다.
const verifyUser = async (payload, done) => {
  const prisma = new PrismaClient();
  try {
    // const user = await prisma.user.findOne({
    //   where: { loginSecret: payload.loginSecret },
    // });
    console.log('!234, ', payload.loginSecret);
    const user = await prisma.user.findOne({
      where: {
        loginSecret: payload.loginSecret,
      },
    });

    if (user !== null) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (e) {
    return done(e, false);
  } finally {
    prisma.disconnect();
  }
};

// middleware function이다. req, res, next를 인자로 받음
export const authenticateJwt = (req, res, next) =>
  // passport.authenticate 함수는 Strategy를 통해서 토큰을 추출한다.
  passport.authenticate('jwt', { session: false }, (error, user) => {
    // 이것은 콜백 function
    // verifyUser에서 사용자를 받아온 후에,
    // 사용자가 존재한다면 그 사용자 정보를 req 객체에 붙여주는 것이다.
    // console.log(req);
    if (user) {
      req.user = user;
    }
    next();
  })(req, res, next);

passport.use(new Strategy(jwtOptions, verifyUser));
passport.initialize();
