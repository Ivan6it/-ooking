import styles from './Comments.module.css';
import { DefaultButton } from '@/shared/ui/buttons/defaultButton';
import { getCommentsCount } from '../../../helpers/helpersFunction';
import { useState } from 'react';
import { CommentsItem } from '@/shared/ui/widgets/CommentsItem';
import type { DirectoryComment } from '@/types/directorySection';

interface CommentsProps {
  className?: string;
  comments: DirectoryComment[];
}

export function Comments({ className, comments }: CommentsProps) {
  const [commentText, setCommentText] = useState('');
  const [visible, setVisible] = useState(false);
  return (
    <div className={`${styles.comments} ${className}`}>
      <h4 className={styles.comments__heading}>{getCommentsCount(comments.length)}</h4>
      <textarea
        className={styles.comments__form}
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Напишите свой комментарий..."
        maxLength={500}
        rows={4}
      />
      <div className={styles.comments__comments}>
        {comments.map((comment, index) => {
          return (
            <div
              key={index}
              className={`${styles.comments__comments__container} ${index > 0 && !visible ? styles.comments__comments__container__visible : ''}`}>
              <CommentsItem data={comment} />
              <div className={styles.comments__comments__container__answers}>
                {comment.answers &&
                  comment.answers.map((item, i) => (
                    <CommentsItem key={i} adressId={comment.user.id} data={item} />
                  ))}
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
