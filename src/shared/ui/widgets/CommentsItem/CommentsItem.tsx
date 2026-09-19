import styles from './CommentsItem.module.css';
import users from '@/data/users.json';
import { formatDate } from '@/shared/helpers/helpersFunction';
import { IconActive } from '../../iconActive';
import { ShareMinIcon } from '@/shared/ui/icons';
import type { DirectoryComment } from '@/types/directorySection';
import { useDispatch, useSelector } from 'react-redux';
import { openAuthModal } from '@/store/userSlice';
import type { RootState } from '@/store';

type User = (typeof users)[number];

interface CommentsItemProps {
  data: DirectoryComment;
  adressId?: number;
  answerSelectUser: (value: boolean, id: number, name: string) => void;
  awners?: boolean;
}

export function CommentsItem({
  data,
  adressId,
  answerSelectUser,
  awners = false,
}: CommentsItemProps) {
  const user = users.filter((item) => item.id === data.user.id)[0] as User;
  const name = users.filter((item) => item.id === adressId)[0];
  const userSession = useSelector((state: RootState) =>
    'id' in state.user.userData ? state.user.userData.id : undefined,
  );
  const hasData = !!userSession;
  const dispatch = useDispatch();

  function handleClick() {
    if (!hasData) {
      dispatch(openAuthModal());
    } else {
      if (awners) {
        answerSelectUser(true, data.date, user.name);
      } else {
        answerSelectUser(false, data.date, user.name);
      }
    }
  }

  return (
    <div className={styles.commentsItem}>
      <div className={styles.commentsItem__user}>
        <img loading="lazy" className={styles.commentsItem__user__img} src={user.image} />
        <div className={styles.commentsItem__user__info}>
          <span className={styles.commentsItem__user__info__name}>
            {user.name} {user.surname}
          </span>
          <span className={styles.commentsItem__user__info__date}>{formatDate(data.date)}</span>
        </div>
        <IconActive
          handleClick={() => handleClick()}
          className={styles.iconShare}
          svg={<ShareMinIcon />}
        />
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
