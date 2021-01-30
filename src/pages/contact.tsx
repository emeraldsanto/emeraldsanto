import { Button } from "@components/button/button.component";
import { Input, TextArea } from "@components/input/input.component";
import { Loading } from "@components/loading/loading.component";
import { Page } from "@components/page/page.component";
import { useIsSmallFormFactor } from '@hooks/useIsSmallFormFactor';
import { sendEmail } from '@lib/email';
import { pipe } from 'fp-ts/lib/pipeable';
import { fold, map, mapLeft } from 'fp-ts/lib/TaskEither';
import { motion, Variants } from "framer-motion";
import useTranslation from "next-translate/useTranslation";
import {
  ChangeEvent,
  FormEvent,
  Fragment,
  useCallback,
  useReducer
} from "react";
import { toast } from "react-toastify";
import styled from 'styled-components';
interface ContactState {
	name: string;
	email: string;
	subject: string;
	message: string;
	status: "idle" | "loading" | "error";
}

type ContactAction =
	| { name: "error" }
	| { name: "submit" }
	| { name: "success" }
	| { name: "name"; payload: ContactState["name"] }
	| { name: "email"; payload: ContactState["email"] }
	| { name: "subject"; payload: ContactState["subject"] }
	| { name: "message"; payload: ContactState["message"] };

const INITIAL_STATE: ContactState = {
	name: "",
	email: "",
	subject: "",
	message: "",
	status: "idle",
};

function contactReducer(
	state: ContactState,
	action: ContactAction
): ContactState {
	switch (action.name) {
		case "success":
			return INITIAL_STATE;
		case "error":
			return {
				...state,
				status: "error",
			};
		case "submit":
			return {
				...state,
				status: "loading",
			};
		default:
			return {
				...state,
				[action.name]: [action.payload],
			};
	}
}

export default function Contact() {
	const [{ name, email, subject, message, status }, dispatch] = useReducer(
		contactReducer,
		INITIAL_STATE
	);

	const { t } = useTranslation();
	const isSmallFormFactor = useIsSmallFormFactor();
		
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
		(event: FormEvent) => {
			event.preventDefault();
			dispatch({ name: "submit" });

      return pipe(
        sendEmail({ name, email, subject, message }),
        mapLeft(() => {
          dispatch({ name: "error" });
          toast(t("contact:sendError"), { type: "error" });
        }),
        map(() => {
          dispatch({ name: "success" });
          toast(t("contact:sendSuccess"), { type: "success" });
        })
      )()
		},
		[t, name, email, subject, message, dispatch]
	);

	return (
		<Page title={t("contact:title")}>
			<Container>
				<motion.div
					initial="hidden"
					animate="visible"
					variants={FADE_VARIANTS}
				>
					<Title variants={CHILD_VARIANTS}>
						{t("contact:title")} 📬
					</Title>

					<Description variants={CHILD_VARIANTS}>
						{t("contact:description")}
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
									placeholder={t("contact:name")}
								/>
							</Row>

							<Row variants={CHILD_VARIANTS}>
								<StyledInput
									required
									type="email"
									name="email"
									value={email}
									onChange={onInputChange}
									placeholder={t("contact:email")}
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
								placeholder={t("contact:name")}
							/>

							<StyledInput
								required
								type="email"
								name="email"
								value={email}
								onChange={onInputChange}
								placeholder={t("contact:email")}
							/>
						</Row>
					)}

					<motion.div variants={CHILD_VARIANTS}>
						<StyledInput
							required
							name="subject"
							value={subject}
							onChange={onInputChange}
							style={{ width: "100%" }}
							placeholder={t("contact:subject")}
						/>
					</motion.div>

					<motion.div variants={CHILD_VARIANTS}>
						<StyledTextArea
							required
							name="message"
							value={message}
							onChange={onInputChange}
							placeholder={t("contact:message")}
						/>
					</motion.div>

					<SubmitContainer
						initial="hidden"
						animate="visible"
						variants={BUTTON_VARIANTS}
					>
						<Submit type="submit" disabled={status === "loading"}>
							{status === "loading" ? (
								<Loading />
							) : (
								<p>{t("contact:send")}</p>
							)}
						</Submit>
					</SubmitContainer>
				</Form>
			</Container>
		</Page>
	);
};

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

