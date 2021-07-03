import { Button } from '@components/button/button.component';
import { Input, TextArea } from '@components/input/input.component';
import { Loading } from '@components/loading/loading.component';
import { Page } from '@components/page/page.component';
import { useIsSmallFormFactor } from '@hooks/useIsSmallFormFactor';
import { to } from '@lib/async';
import { sendEmail } from '@lib/email';
import { CMS, StoryPageProps, withEditable } from '@lib/storyblok';
import { motion, Variants } from 'framer-motion';
import {
  ChangeEvent,
  FormEvent,
  Fragment,
  useCallback,
  useReducer
} from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { match, __ } from 'ts-pattern';

interface ContactState {
	name: string;
	email: string;
	subject: string;
	message: string;
	status: 'idle' | 'loading' | 'error';
}

type ContactAction =
	| { name: 'error' }
	| { name: 'submit' }
	| { name: 'success' }
	| { name: 'name'; payload: ContactState['name'] }
	| { name: 'email'; payload: ContactState['email'] }
	| { name: 'subject'; payload: ContactState['subject'] }
	| { name: 'message'; payload: ContactState['message'] };

const INITIAL_STATE: ContactState = {
  name: '',
  email: '',
  subject: '',
  message: '',
  status: 'idle',
};

const contactReducer = (state: ContactState, action: ContactAction): ContactState => 
  match<ContactAction, ContactState>(action)
    .with({ name: 'success' }, () => INITIAL_STATE)
    .with({ name: 'error' }, () => ({ ...state, status: 'error' }))
    .with({ name: 'submit' }, () => ({ ...state, status: 'loading' }))
    .with({ payload: __ }, (a) => ({ ...state, [action.name]: a.payload }))
    .otherwise(() => ({ ...state }));

type ContactProps = StoryPageProps<{
  title: string
  presentation: string
  fullNameField: string
  emailField: string
  subjectField: string
  messageField: string
  buttonCTA: string
  sendSuccessMessage: string
  sendErrorMessage: string
}>;

function Contact({ story }: ContactProps) {
  const isSmallFormFactor = useIsSmallFormFactor();
  const [{ name, email, subject, message, status }, dispatch] = useReducer(contactReducer, INITIAL_STATE);

  const onInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      dispatch({
        name: event.target.name as ContactAction['name'],
        payload: event.target.value,
      });
    },
    [dispatch]
  );

  const onFormSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      dispatch({ name: 'submit' });

      const [error] = await to(sendEmail({ name, email, subject, message }));

      if (error) {
        dispatch({ name: 'error' });
        toast(story.content.sendErrorMessage, { type: 'error' });
      } else {
        dispatch({ name: 'success' });
        toast(story.content.sendSuccessMessage, { type: 'success' });
      }
    },
    [story, name, email, subject, message, dispatch]
  );

  return (
    <Page title={story.content.title}>
      <Container>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={FADE_VARIANTS}
        >
          <Title variants={CHILD_VARIANTS}>
            {story.content.title} 📬
          </Title>

          <Description variants={CHILD_VARIANTS}>
            {story.content.presentation}
          </Description>
        </motion.div>

        <Form
          initial="hidden"
          animate="visible"
          onSubmit={onFormSubmit}
          variants={DELAY_FADE_VARIANTS}
        >
          {isSmallFormFactor ? (
            <Fragment>
              <Row variants={CHILD_VARIANTS}>
                <StyledInput
                  required
                  name="name"
                  value={name}
                  onChange={onInputChange}
                  placeholder={story.content.fullNameField}
                />
              </Row>

              <Row variants={CHILD_VARIANTS}>
                <StyledInput
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={onInputChange}
                  placeholder={story.content.emailField}
                />
              </Row>
            </Fragment>
          ) : (
            <Row variants={CHILD_VARIANTS}>
              <StyledInput
                required
                name="name"
                value={name}
                onChange={onInputChange}
                placeholder={story.content.fullNameField}
              />

              <StyledInput
                required
                type="email"
                name="email"
                value={email}
                onChange={onInputChange}
                placeholder={story.content.emailField}
              />
            </Row>
          )}

          <motion.div variants={CHILD_VARIANTS}>
            <StyledInput
              required
              name="subject"
              value={subject}
              onChange={onInputChange}
              style={{ width: '100%' }}
              placeholder={story.content.subjectField}
            />
          </motion.div>

          <motion.div variants={CHILD_VARIANTS}>
            <StyledTextArea
              required
              name="message"
              value={message}
              onChange={onInputChange}
              placeholder={story.content.messageField}
            />
          </motion.div>

          <SubmitContainer
            initial="hidden"
            animate="visible"
            variants={BUTTON_VARIANTS}
          >
            <Submit type="submit" disabled={status === 'loading'}>
              {status === 'loading' ? (
                <Loading />
              ) : (
                <p>{story.content.buttonCTA}</p>
              )}
            </Submit>
          </SubmitContainer>
        </Form>
      </Container>
    </Page>
  );
}

export const getStaticProps = CMS.getStaticProps('contact');

export default withEditable(Contact);

const FADE_VARIANTS: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const DELAY_FADE_VARIANTS: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.2,
    },
  },
};

const CHILD_VARIANTS: Variants = {
  hidden: {
    opacity: 0,
    translateX: -50,
  },
  visible: {
    opacity: 1,
    translateX: 0,
  },
};

const BUTTON_VARIANTS: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.65,
  },
  visible: {
    scale: 1,
    opacity: 1,
  },
};

const Container = styled.div`
  width: 500px;

  @media only screen and (max-width: 815px) {
		width: initial;
  }
`;

const Title = styled(motion.h1)`
  margin-bottom: 25px;

  @media only screen and (max-width: 815px) {
		margin-bottom: 20px;
  }
`;

const Description = styled(motion.p)`
  line-height: 22px;
  margin-bottom: 25px;
  text-align: justify;
`;

const Form = styled(motion.form)`
  @media only screen and (max-width: 815px) {
		width: 100%;
  }
`;

const Row = styled(motion.div)`
  display: flex;
  justify-content: stretch;
`;

const StyledInput = styled(Input)`
  flex-basis: 50%;

  &:first-child {
    margin-right: 20px;
  }

  @media only screen and (max-width: 815px) {
		width: 100%;
		flex-basis: initial;

		&:first-child {
			margin-right: 0;
		}
  }
`;

const StyledTextArea = styled(TextArea)`
  width: 100%;

  @media only screen and (max-width: 815px) {
		width: 100%;
		margin-bottom: 20px;
  }
`;

const SubmitContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
`;

const Submit = styled(Button)`
  display: flex;
  justify-content: center;
`;

