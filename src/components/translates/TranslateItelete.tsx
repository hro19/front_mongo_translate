import React, { Dispatch, SetStateAction } from "react";
import TranslateDelete from "../../components/translates/TranslateDelete";
import { formatDate } from "../../components/translates/Honyaku";
import {speakTextAndBtn,stopSpeaking} from "../../components/translates/Onsei";
import { Translate, TranslateObj } from "../../ts/Translate";
import { AiFillPauseCircle, AiOutlineSound } from "react-icons/ai";
import { useAtom } from "jotai";
import {isSpeakingAtom} from "../../jotai/translatesAtoms";

const TranslateItelete = ({ translate }: TranslateObj) => {
  //現在音声再生中かを判断
  const [isSpeaking, setIsSpeaking] = useAtom(isSpeakingAtom);

  return (
    <>
      <div key={translate._id} className="border-b border-bp mb-2 pb-2 b-4">
        <h2 className="text-sm font-bold text-green-700">
          作成日【{formatDate(translate.created_at)}】
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="border rounded-lg p-2 bg-blue-100 text-left">
              {translate.jaContent}
            </p>
            <TranslateDelete translate={translate} />
          </div>
          <div>
            <p className="border rounded-lg p-2 bg-pink-100 text-left">
              {translate.enContent}
            </p>
            {isSpeaking ? (
              <button
                className="mt-2 bg-teal-500 text-white py-1 px-2 rounded-md hover:bg-teal-700 text-sm"
                onClick={() => stopSpeaking(setIsSpeaking)}
              >
                {/* 音声停止ボタン */}
                <AiFillPauseCircle
                  className="icon text-white my-1 mx-2 inline-block"
                  size="1.4rem"
                />
              </button>
            ) : (
              <button
                className="mt-2 bg-cyan-500 text-white py-1 px-2 rounded-md hover:bg-cyan-700 text-sm"
                onClick={() =>
                  speakTextAndBtn({
                    content: translate.enContent,
                    setIsSpeaking,
                  })
                }
              >
                {/* 音声再生ボタン */}
                <AiOutlineSound
                  className="icon text-white my-1 mx-2 inline-block"
                  size="1.4rem"
                />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TranslateItelete;
