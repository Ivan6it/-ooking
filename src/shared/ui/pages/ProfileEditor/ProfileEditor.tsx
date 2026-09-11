import { DefaultButton } from '../../buttons/defaultButton';
import { IconActive } from '../../iconActive';
import styles from './ProfileEditor.module.css';
import { Input } from '@/shared/ui/input';
import { AsteriskIcon, CalendarIcon } from '@/shared/ui/icons';
import { useState, useRef, useEffect } from 'react';
import { Select } from '../../select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale/ru';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, updateUser } from '@/store/userSlice';
import type { User } from '@/types/users';
import type { AppDispatch } from '@/store';

type FileState = {
  fileImage: File | null;
  preview: string;
};

type BirthdayState = {
  oldDate: Date | null;
  nextDate: Date | null;
};

export default function ProfileEditor() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<FileState>({ fileImage: null, preview: '' });
  const [birthdayVerificationResult, setBirthdayVerificationResult] = useState<BirthdayState>({
    oldDate: null,
    nextDate: null,
  });
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [passwordVerificationResult, setPasswordVerificationResult] = useState({
    password1: false,
    text1: '',
    password2: false,
    text2: '',
  });
  const [genderVerificationResult, setGenderVerificationResult] = useState({
    oldGender: '',
    nextGender: '',
  });
  const [nameVerificationResult, setNameVerificationResult] = useState({
    name: '',
    nameResult: false,
  });

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const calendarRef = useRef<HTMLDivElement>(null);
  const today = new Date();
  const user = useSelector((state: any) => state.user.userData);

  const options = [
    { value: 'none', name: 'Выберите пол' },
    { value: 'male', name: 'Мужской' },
    { value: 'female', name: 'Женский' },
  ];

  useEffect(() => {
    if (!user?.name) return;

    setNameVerificationResult({
      name: user.name,
      nameResult: false,
    });

    setGenderVerificationResult({
      oldGender: user.gender,
      nextGender: '',
    });

    setBirthdayVerificationResult({
      oldDate: user.birthday,
      nextDate: null,
    });

    setPasswordVerificationResult({
      password1: false,
      text1: '',
      password2: false,
      text2: '',
    });

    setSelectedFile({
      fileImage: null,
      preview: '',
    });

    const avatarUser =
      user.image !== ''
        ? user.image
        : user.gender !== 'none'
          ? user.gender === 'female'
            ? '/images/imageUsers/defaultWoman.jpg'
            : '/images/imageUsers/defaultMan.jpg'
          : '/images/imageUsers/Anonim.jpg';

    setPreviewUrl(avatarUser);
  }, [user]);

  const handleSave = () => {
    const updateData: Partial<User> & { id: number } = {
      id: user.id,
    };

    if (detectedResultName) {
      updateData.name = nameVerificationResult.name;
    }

    if (detectedGender) {
      updateData.gender = genderVerificationResult.nextGender;
    }

    if (detectedBirthday) {
      updateData.birthday = birthdayVerificationResult.nextDate;
    }

    if (detectedResultPassword) {
      updateData.password = passwordVerificationResult.text1;
    }

    dispatch(
      updateUser({
        userData: updateData,
        image: selectedFile.fileImage,
      }),
    );
  };

  const genderDefault = options.find((opt) => opt.value === user.gender) || options[0];

  function createObjectURL(file: File): Promise<string> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const url = await createObjectURL(file);
      setSelectedFile((prev) => ({ ...prev, fileImage: file, preview: url }));
    }
    if (!file) return;
  }

  function nameVerification(text: string, result: boolean) {
    setNameVerificationResult(() => ({ name: text, nameResult: result }));
  }

  function passwordVerification(num: number, text: string, result: boolean) {
    if (num === 1) {
      if (!result) {
        setPasswordVerificationResult((prev) => ({ ...prev, password1: false, text1: text }));
      } else {
        setPasswordVerificationResult((prev) => ({ ...prev, password1: true, text1: text }));
      }
    } else {
      if (!result) {
        setPasswordVerificationResult((prev) => ({ ...prev, password2: false, text2: text }));
      } else {
        setPasswordVerificationResult((prev) => ({ ...prev, password2: true, text2: text }));
      }
    }
  }

  // Условия разблокировки кнопки

  // Проверка пароля
  const detectedPassword = passwordVerificationResult.text1 !== passwordVerificationResult.text2;
  const detectedResultPassword =
    !detectedPassword &&
    passwordVerificationResult.password1 &&
    passwordVerificationResult.password2;

  // Проверка имени
  const detectedName = nameVerificationResult.name === user.name;
  const detectedResultName = !detectedName && nameVerificationResult.nameResult;

  // Проверка пола
  const detectedGender =
    genderVerificationResult.nextGender !== '' &&
    genderVerificationResult.nextGender !== genderVerificationResult.oldGender;

  // Проверка даты рождения
  const detectedBirthday = birthdayVerificationResult.nextDate
    ? !birthdayVerificationResult.oldDate ||
      new Date(birthdayVerificationResult.oldDate).getTime() !==
        new Date(birthdayVerificationResult.nextDate).getTime()
    : false;

  // Результат проверки
  const result =
    !detectedResultPassword &&
    !detectedResultName &&
    !detectedGender &&
    !detectedBirthday &&
    !selectedFile.fileImage;

  return (
    <div className={styles.profileEditor}>
      <span className={styles.profileEditor__text}>
        <Link to={'/'} className={styles.profileEditor__text__link}>
          Главная
        </Link>{' '}
        /{' '}
        <Link to={'/profile'} className={styles.profileEditor__text__link}>
          Профиль
        </Link>{' '}
        /&nbsp;<span>Редактировать профиль</span>
      </span>
      <h2 className={styles.profileEditor__heading}>Редактировать профиль</h2>
      <form>
        <div className={styles.profileEditor__editorImage}>
          <img
            loading="lazy"
            className={styles.profileEditor__editorImage__image}
            alt="Аватар пользователя"
            src={selectedFile.preview || previewUrl || undefined}
          />
          <div className={styles.profileEditor__editorImage__container}>
            <label htmlFor="upload-image">
              <DefaultButton
                className={styles.profileEditor__editorImage__container__button}
                text="Загрузить изображение"
                handleClick={() => {
                  if (fileInputRef.current) {
                    fileInputRef.current.click();
                  }
                }}
              />
            </label>
            <p className={styles.profileEditor__editorImage__container__text}>
              Изображения должны быть в формате jpg, png
            </p>
            <input
              ref={fileInputRef}
              id="upload-image"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleFileUpload}
            />
          </div>
        </div>
        <div className={styles.profileEditor__name}>
          <div className={styles.profileEditor__name__container}>
            <span className={styles.profileEditor__name__container__text}>Ваше имя</span>
            <IconActive
              className={styles.profileEditor__name__container__svg}
              svg={<AsteriskIcon />}
            />
            <span className={styles.profileEditor__name__container__info}>Обязательное поле</span>
          </div>
          <Input
            classInput={styles.profileEditor__name__input}
            placeholder="Введите имя"
            userName={user?.name || ''}
            type="text"
            nameInput={true}
            validateName={nameVerification}
          />
        </div>
        <p className={styles.profileEditor__politics}>
          Конфиденциальность ваших данных важна для нас. Ознакомьтесь с нашими&nbsp;
          <a target="_blank" href="https://ru.wikipedia.org/wiki/Условия_использования">
            условиями использования
          </a>
          &nbsp;и &nbsp;
          <a
            href="https://translated.turbopages.org/proxy_u/en-ru.ru.1d54a161-6a70e5da-1f9f2ecc-74722d776562/https/en.wikipedia.org/wiki/Privacy_policy"
            target="_blank">
            уведомлением о конфиденциальности
          </a>
          &nbsp;здесь
        </p>
        <div className={styles.profileEditor__container}>
          <div className={styles.profileEditor__container__select}>
            <label htmlFor="birthday">День рождения</label>
            <DatePicker
              onFocus={() => setIsCalendarOpen(true)}
              onBlur={() => setIsCalendarOpen(false)}
              locale={ru}
              maxDate={today}
              selected={birthdayVerificationResult.nextDate || birthdayVerificationResult.oldDate}
              id="date"
              dateFormat="dd.MM.yyyy"
              placeholderText="ДД.ММ.ГГГГ"
              customInput={
                <div
                  ref={calendarRef}
                  className={styles.profileEditor__container__calendar__wrapper}>
                  <input
                    readOnly={true}
                    id="birthday"
                    value={
                      birthdayVerificationResult.nextDate
                        ? format(birthdayVerificationResult.nextDate, 'dd.MM.yyyy')
                        : birthdayVerificationResult.oldDate
                          ? format(birthdayVerificationResult.oldDate, 'dd.MM.yyyy')
                          : ''
                    }
                    type="text"
                    className={styles.profileEditor__container__calendar__inputField}
                    placeholder="ДД.ММ.ГГГГ"
                  />
                  <CalendarIcon className={styles.profileEditor__container__calendar__icon} />
                </div>
              }
              onChange={(date: Date | null) => {
                const value = date;
                setBirthdayVerificationResult((prev) => ({ ...prev, nextDate: value }));
              }}
              className={`${styles.profileEditor__container__calendar__className} ${isCalendarOpen ? styles.profileEditor__container__calendar__className__active : ''}`}
              calendarClassName={styles.profileEditor__container__calendar__calendarClassName}
            />
          </div>
          <div className={styles.profileEditor__container__select}>
            <label>Пол</label>
            <Select
              onChange={(val) =>
                setGenderVerificationResult((prev) => ({ ...prev, nextGender: val }))
              }
              defaultOption={genderDefault}
              classValue={styles.profileEditor__container__select__classValue}
              firstElement={false}
              classList={styles.profileEditor__container__select__classList}
              classSelect={styles.profileEditor__container__select__classSelect}
              options={options}
            />
          </div>
        </div>
        <Input
          className={styles.profileEditor__container__select}
          label="Ваш Email"
          classInput={styles.profileEditor__container__select__classInput}
          readOnly={true}
          disabled={true}
          value={user.mail}
          type="text"
        />
        <div className={styles.profileEditor__password}>
          <div className={styles.profileEditor__password__info}>
            <h3>Изменить пароль</h3>
            <span>Ваш пароль должен содержать не менее 8 символов</span>
          </div>
          <div className={styles.profileEditor__password__inputs}>
            <Input
              validatePassword={{ fn: passwordVerification, id: 1 }}
              className={styles.profileEditor__container__select}
              label="Новый пароль"
              classInput={styles.profileEditor__password__inputs__input}
              placeholder="Пароль"
              type="password"
              id="password"
              passwordInput={true}
            />
            <Input
              validatePassword={{ fn: passwordVerification, id: 2 }}
              className={styles.profileEditor__container__select}
              label="Повторить пароль"
              classInput={styles.profileEditor__password__inputs__input}
              placeholder="Пароль"
              type="password"
              id="password"
              passwordInput={true}
            />
          </div>
          {passwordVerificationResult.password1 &&
            passwordVerificationResult.password2 &&
            detectedPassword && (
              <span className={styles.profileEditor__password__inputs__error}>
                Пароли должны совпадать
              </span>
            )}
        </div>
        <div className={styles.profileEditor__buttons}>
          <DefaultButton
            handleClick={() => handleSave()}
            disabled={result}
            className={styles.profileEditor__buttons__save}
            text="Сохранить изменения"
          />
          <DefaultButton
            handleClick={() => {
              dispatch(logout());
              navigate('/');
            }}
            className={styles.profileEditor__buttons__logout}
            text="Выйти"
          />
        </div>
      </form>
    </div>
  );
}
