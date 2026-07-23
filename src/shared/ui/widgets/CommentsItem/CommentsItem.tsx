import styles from './CommentsItem.module.css';
import users from '@/data/users.json';
import { formatDate } from '@/shared/helpers/helpersFunction';
import { IconActive } from '../../iconActive';
import { ShareMinIcon } from '@/shared/ui/icons';
import type { Answer } from '@/data/directorySection.json';

type User = (typeof users)[number];

interface CommentsItemProps {
  data: Answer;
  adressId?: number;
}

export function CommentsItem({ data, adressId }: CommentsItemProps) {
  const user = users.filter((item) => item.id === data.user.id)[0] as User;
  const name = users.filter((item) => item.id === adressId)[0];
  console.log(name);
  return (
    <div className={styles.commentsItem}>
      <div className={styles.commentsItem__user}>
        <img className={styles.commentsItem__user__img} src={user.image} />
        <div className={styles.commentsItem__user__info}>
          <span className={styles.commentsItem__user__info__name}>
            {user.name} {user.surname}
          </span>
          <span className={styles.commentsItem__user__info__date}>{formatDate(data.date)}</span>
        </div>
        <IconActive className={styles.iconShare} svg={<ShareMinIcon />} />
      </div>
      <p className={styles.commentsItem__comment}>
        {name && (
          <span className={styles.commentsItem__comment__name}>
            {name.name} {name.surname},&nbsp;
          </span>
        )}
        {data.comment}
      </p>
    </div>
  );
}
