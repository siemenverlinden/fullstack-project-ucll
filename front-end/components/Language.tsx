import React from 'react';
import { useRouter } from "next/router";
import {useTranslation} from "next-i18next";

const Language: React.FC = () => {

    const { t } = useTranslation();

    const router = useRouter();
    const { pathname, asPath, query } = router;

    const handleLanguageChange = (newLocale: string) => {
        console.log(newLocale);
        router.push({ pathname, query }, asPath, { locale: newLocale });
    };

    return (
        <>
            <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost rounded-btn">{t('app.lang.language')}</div>
                <ul
                    tabIndex={0}
                    className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-52 p-2 shadow text-black">
                    <li>
                        <a onClick={() => handleLanguageChange("nl")}>{t('app.lang.dutch')}</a>
                    </li>
                    <li>
                        <a onClick={() => handleLanguageChange("en")}>{t('app.lang.en')}</a>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default Language;
