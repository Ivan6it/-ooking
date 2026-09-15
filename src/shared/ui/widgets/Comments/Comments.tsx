import styles from './Comments.module.css';
import { DefaultButton } from '@/shared/ui/buttons/defaultButton';
import { getCommentsCount } from '../../../helpers/helpersFunction';
import { useState } from 'react';
import { CommentsItem } from '@/shared/ui/widgets/CommentsItem';
import type { DirectoryComment } from '@/types/directorySection';

interface CommentsProps {
  className?: string;
  commentText: string;
  comments: DirectoryComment[];
  setCommentText(value: React.ChangeEvent<HTMLTextAreaElement>): void;
  sendComment(): void;
  disabled?: boolean;
  answerSelectUser: (value: boolean, id: number, name: string) => void;
  userAnswerName?: string;
}

export function Comments({
  sendComment,
  commentText,
  setCommentText,
  className,
  comments,
  disabled = false,
  answerSelectUser,
  userAnswerName,
}: CommentsProps) {
  const [visible, setVisible] = useState(false);
  return (
    <div className={`${styles.comments} ${className}`}>
      <h4 className={styles.comments__heading}>{getCommentsCount(comments.length)}</h4>
      <textarea
        className={styles.comments__form}
        value={commentText}
        onChange={(e) => setCommentText(e)}
        placeholder="Напишите свой комментарий..."
        maxLength={500}
        rows={4}
      />

      <div className={styles.comment__container}>
        {userAnswerName && (
          <p onClick={() => answerSelectUser(false, 0, '')} className={styles.comments__text}>
            Отвечаете пользователю с именем {userAnswerName} (для отмены нажмите на это сообщение)
          </p>
        )}
        <DefaultButton
          disabled={disabled}
          handleClick={() => sendComment()}
          className={styles.comments__button}
          text="Отправить"
        />
      </div>
      <div className={styles.comments__comments}>
        {comments.map((comment, index) => {
          return (
            <div
              key={index}
              className={`${styles.comments__comments__container} ${index > 0 && !visible ? styles.comments__comments__container__visible : ''}`}>
              <CommentsItem answerSelectUser={answerSelectUser} data={comment} />
              <div className={styles.comments__comments__container__answers}>
                {comment.answers &&
                  comment.answers.map((item, i) => {
                    const replyToUser =
                      item.replyTo === comment.date
                        ? comment.user.id
                        : comment.answers?.find((answer) => answer.date === item.replyTo)?.user.id;

                    return (
                      <CommentsItem
                        awners={true}
                        answerSelectUser={answerSelectUser}
                        key={i}
                        adressId={replyToUser}
                        data={item}
                      />
                    );
                  })}
              </div>
            </div>
          );
        })}
      </div>
      {comments.length < 2 ? (
        ''
      ) : (
        <DefaultButton
          handleClick={() => setVisible((prev) => !prev)}
          className={styles.comments__buttons}
          text={visible ? 'Показать меньше' : 'Загрузить больше'}
        />
      )}
    </div>
  );
}
