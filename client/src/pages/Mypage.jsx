import { useRef } from 'react';
import { edit } from '@/store/creator/usersCreator';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { ReactComponent as UserIcon } from 'assets/user.svg';
import Label from '@/components/elements/Label';
import Button from '@/components/elements/Button';
import Input from '@/components/elements/Input';
import ErrorMessage from '@/components/shared/ErrorMessage';
import Slider from 'react-slick';
import '../slick.css';
import '../slick-theme.css';
import { settings } from '@/constants/Landing';
import { ads } from '@/constants/MyPage';

import { ReactComponent as CollectionIcon } from 'assets/collection.svg';
import { ReactComponent as QuestionIcon } from 'assets/question.svg';

export default function Mypage() {
  const history = useHistory();
  const dispatch = useDispatch();
  // * react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = useRef();
  password.current = watch('password');

  const { userInfo, accessToken, editDone, editError } = useSelector(state => state.users);

  const onSubmit = data => {
    const newData = {
      nickname: data.nickname,
      password: data.password,
      email: userInfo?.email,
    };
    dispatch(edit({ accessToken, payload: newData }));
  };

  return (
    <Layout>
      <Field>
        <Slider {...settings}>
          {ads.map(ad => (
            <AdBox key={ad.id}>
              <AdImg src={ad.src} alt="saleImage" />
            </AdBox>
          ))}
        </Slider>
      </Field>
      <Container>
        <div
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          <div
            css={theme =>
              css`
                background-color: ${theme.colors.tint.blue[200]};
                width: 3rem;
                height: 3rem;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
              `
            }
          >
            <UserIcon width="2rem" height="2rem" opacity="0.8" />
          </div>
          <div
            css={css`
              margin-left: 1rem;
            `}
          >
            <Text
              css={theme => css`
                ${theme.typography.subtitle[4]}
              `}
            >
              {userInfo?.nickname}
            </Text>
            <Label>{userInfo?.email}</Label>
          </div>
        </div>
        <Field>
          <div
            css={css`
              display: flex;
              align-items: center;
              justify-content: space-around;
              margin-top: 1.75rem;
            `}
          >
            <ButtonBox onClick={() => history.push('/collection')}>
              <CollectionIcon width="1.5rem" height="1.5rem" />
              <Label>?????????</Label>
            </ButtonBox>
            <ButtonBox>
              <QuestionIcon width="1.5rem" height="1.5rem" />
              <Label>?????????</Label>
            </ButtonBox>
            <ButtonBox>
              <QuestionIcon width="1.5rem" height="1.5rem" />
              <Label>?????????</Label>
            </ButtonBox>
            <ButtonBox>
              <QuestionIcon width="1.5rem" height="1.5rem" />
              <Label>?????????</Label>
            </ButtonBox>
          </div>
        </Field>
        <Field>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Field>
              <Label>????????? ?????????</Label>
              <Input
                placeholder="???????????? 2~12??? ???????????? ?????????."
                {...register('nickname', {
                  required: { value: true, message: '????????? ???????????? ?????????.' },
                  minLength: { value: 2, message: '???????????? 2??? ??????????????? ?????????.' },
                  maxLength: { value: 12, message: '???????????? 12??? ???????????? ?????????.' },
                })}
              />
              {errors?.nickname && <ErrorMessage>{errors.nickname.message}</ErrorMessage>}
            </Field>
            <Field>
              <Label>????????? ????????????</Label>
              <Input
                ref={password}
                placeholder="8??? ????????? ??????????????? ???????????????."
                type="password"
                {...register('password', {
                  required: { value: true, message: '????????? ???????????? ?????????.' },
                  minLength: { value: 8, message: '??????????????? 8??? ??????????????? ?????????.' },
                })}
              />
              {errors?.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
            </Field>
            <Field>
              <Label>????????? ???????????? ??????</Label>
              <Input
                placeholder="???????????? ??????????????? ?????? ??? ???????????????."
                type="password"
                {...register('passwordConfirm', {
                  required: true,
                  validate: value => value === password.current,
                })}
              />
              {errors?.passwordConfirm && errors?.passwordConfirm?.type === 'required' && (
                <ErrorMessage>????????? ???????????? ?????????.</ErrorMessage>
              )}
              {errors?.passwordConfirm && errors?.passwordConfirm?.type === 'validate' && (
                <ErrorMessage>???????????? ??????????????? ???????????? ????????????.</ErrorMessage>
              )}
            </Field>
            <Button secondary lg>
              ?????? ????????????
            </Button>
          </Form>
        </Field>
      </Container>
    </Layout>
  );
}

const Layout = styled.div``;
const Title = styled.p`
  ${({ theme }) => theme.typography.subtitle[3]}
  margin-bottom: 1.5rem;
  text-align: center;
`;
const Container = styled.div``;
const Field = styled.div`
  margin-bottom: 1.5rem;
  overflow: hidden;
`;
const Text = styled.p``;
const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;
const Form = styled.form``;
const AdBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 8rem;
  overflow: hidden;
  border-radius: 5px;
`;
const AdImg = styled.img`
  width: 100%;
`;
