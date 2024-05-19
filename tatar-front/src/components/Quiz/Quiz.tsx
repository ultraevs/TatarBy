import { useState } from "react";
import styles from "./styles.module.scss";
import Modal from "../Modal/Modal";

import close from "./../../assets/svg/close.svg";

const Quiz = () => {
  const [active, setActive] = useState(false);

  const openModal = () => {
    setActive(true);
  };

  const closeModal = () => {
    setActive(false);
  };
  const questions = [
    {
      question: 'Как перевести на татарский язык фразу "Привет, как дела?',
      options: [
        "Сәлем, кәрәкчәләр, нә хәл?",
        "Сәлам, хәлләр ничек?",
        "Сәлем, якшы, нә хәл?",
        "Сәлем, якшы, нәхәл?",
      ],
      correctAnswer: "Сәлам, хәлләр ничек?",
    },
    {
      question: 'Как перевести на татарский язык слово "спасибо"?',
      options: ["Рәхмәт", "Сәгать", "Бәлки", "Рехмәт"],
      correctAnswer: "Рәхмәт",
    },
    {
      question: 'Как перевести на татарский язык фразу "Я говорю по-татарски"?',
      options: [
        "Мин татар теленде сөйләм",
        "Мин татарча сөйләм",
        "Мин татар теле сөйләм",
      ],
      correctAnswer: "Мин татарча сөйләм",
    },
    {
      question: 'Что означает слово "Тәҗрибә"?',
      options: ["Опыт", "Знание", "Умение", "Навык"],
      correctAnswer: "Опыт",
    },
    {
      question:
        'Как правильно написать слово "университет" на татарском языке?',
      options: ["университет", "университэт", "университәт ", "унивәрситәт "],
      correctAnswer: "университет",
    },
  ];

  const [answers, setAnswers] = useState(Array(questions.length).fill(""));

  console.log(answers)

  const handleAnswerChange = (index: number, selectedOption: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = selectedOption;
    setAnswers(newAnswers);
  };

  const calculateScore = () => {
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
      if (answers[i] === questions[i].correctAnswer) {
        score++;
      }
    }
    return score;
  };
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    try {
      const data = JSON.stringify({
        email: email,
        result: calculateScore().toString(),
      });
      const response = await fetch(
        "http://localhost:8090/v1/add_new_promo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: data,
        }
      );
      const responseData = await response.json();
      if (responseData.message === "success") {
        console.log("Успех:", responseData);
        alert("Письмо отправлено");
      } else if (responseData.error === "Email already exists") {
        console.log(
          "На такую почту уже отправлен промокод",
          responseData.error
        );
        alert("На такую почту уже отправлен промокод");
      }
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
    }
  };
  return (
    <div className={styles.quiz__container}>
      <div className={styles.question__section}>
        {questions.map((question, index) => (
          <div key={index} className={styles.question}>
            <div className={styles.question__text}>{question.question}</div>
            <div className={styles.options}>
              {question.options.map((option, optionIndex) => (
                <label key={optionIndex}>
                  {option}
                  <input
                    type="radio"
                    value={option}
                    checked={answers[index] === option}
                    onChange={() => handleAnswerChange(index, option)}
                  />
                </label>
              ))}
            </div>
            <div className={styles.question__vector}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1440"
                height="600"
                viewBox="0 0 1440 600"
                fill="none"
              >
                <g filter="url(#filter0_f_161_492)">
                  <path
                    d="M394.004 461.15C394.004 459.37 391.458 447.53 394.474 446.336C396.47 445.546 398.208 473.197 397.77 475.963C397.596 477.061 394.29 485.478 397.417 481.343C407.051 468.604 416.413 455.746 427.901 443.541C429.218 442.141 437.182 431.558 439.435 437.672C442.623 446.324 439.667 456.434 438.023 465.063C436.332 473.933 433.726 482.748 431.196 491.545C430.057 495.505 428.718 497.123 432.844 492.314C448.248 474.356 464.584 453.756 486.279 438.091C491.794 434.109 488.616 448.408 487.691 453.533C484.746 469.853 478.148 485.666 472.39 501.677C470.308 507.469 466.27 514.279 466.27 520.264C466.27 521.203 467.534 518.542 468.153 517.678C473.796 509.813 480.356 502.201 487.22 494.689C499.154 481.632 511.063 467.423 526.767 455.769C528.091 454.787 536.08 448.835 538.066 452.765C542.945 462.419 539.799 474.441 539.125 484.278C538.342 495.722 538.066 507.135 538.066 518.587C538.066 519.167 536.409 528.549 539.831 524.246C549.103 512.59 557.047 500.463 564.666 488.401C571.039 478.31 577.157 468.154 583.262 458.005C588.357 449.536 584.52 462.008 583.968 463.386C579.243 475.178 572.589 486.666 568.903 498.602C566.854 505.236 565.113 507.798 572.198 500.14C581.336 490.264 591.365 480.802 603.506 472.12C606.893 469.698 614.515 462.756 620.69 462.407C624.533 462.19 615.162 501.743 614.334 505.73C613.742 508.581 613.107 511.931 612.687 514.813C612.433 516.554 610.379 520.934 612.922 520.054C624.671 515.985 633.391 501.642 640.463 494.899C640.669 494.703 651.952 484.174 653.645 487.422C657.331 494.491 642.536 507.52 637.992 513.626C633.736 519.343 623.992 537.187 626.81 531.164C630.537 523.199 634.374 515.253 637.521 507.197C637.576 507.055 640.414 499.504 640.699 498.812C641.296 497.361 644.596 494.174 642.111 494.41C630.898 495.475 616.442 505.911 607.626 509.782C605.868 510.554 587.11 520.22 583.968 516.351C577.03 507.808 585.173 490.529 587.97 481.833C588.869 479.036 591.878 471.318 592.913 468.347C593.986 465.267 596.923 456.707 593.149 458.914C576.03 468.92 565.252 485.388 552.661 497.484C547.106 502.821 542.565 509.343 535.947 514.254C534.192 515.557 538.084 496.341 538.301 495.668C541.954 484.373 546.253 473.274 548.659 461.848C550.661 452.341 544.727 457.01 538.301 462.966C525.585 474.754 514.713 487.351 503.698 499.72C501.248 502.472 494.131 515.379 488.515 516.49C487.898 516.612 487.22 492.038 487.22 490.916C487.22 481.977 490.636 469.817 483.572 461.429C471.333 446.898 447.049 461.671 433.432 466.6C409.672 475.201 417.243 447.59 418.367 440.117C418.423 439.743 419.265 429.485 418.956 429.566C415.166 430.566 413.78 443.882 413.071 445.987C411.379 451.008 409.449 456.031 408.834 461.15C407.918 468.759 411.627 445.948 414.483 438.51C419.057 426.597 425.245 414.953 433.315 403.713C433.551 403.383 439.983 393.395 440.494 398.402C443.065 423.582 431.652 450.328 423.899 474.985C423.895 474.998 420.153 487.104 422.957 484.068C436.948 468.923 451.356 454.244 468.389 440.187C470.417 438.513 484.584 424.38 490.045 424.675C494.257 424.902 488.589 453.307 488.397 454.442C485.675 470.557 481.774 486.557 479.923 502.725C479.454 506.826 475.903 520.358 486.043 510.761C494.984 502.299 501.928 493.192 511.231 484.837C513.374 482.913 518.775 476.147 523.236 475.264C523.484 475.215 524.611 520.113 525.825 525.993C528.347 538.202 548.267 526.541 555.132 522.43C580.222 507.405 598.094 488.985 616.924 471.212C621.721 466.683 633.194 450.898 642.464 448.782C644.196 448.386 638.559 469.807 638.109 471.072C635.254 479.103 631.428 487.122 629.4 495.248C629.153 496.237 628.151 499.474 630.106 496.786C632.854 493.007 635.994 487.644 641.523 484.977C644.363 483.607 635.398 502.367 635.049 503.074C627.974 517.436 622.337 531.788 618.807 546.606C618.274 548.841 613.22 562.88 618.336 552.965C622.839 544.238 627.431 535.504 632.224 526.832C634.023 523.577 637.639 519.347 637.639 515.792C637.639 514.096 635.932 519.05 634.578 520.543C634.208 520.952 638.291 511.749 639.757 509.782C641.302 507.71 656.248 485.582 654.116 495.388C653.168 499.749 643.969 517.429 656.706 507.686C658.318 506.453 677.891 491.269 677.891 497.205C677.891 500.62 667.353 512.258 672.948 507.546C679.433 502.084 685.269 496.324 692.368 491.126C693.763 490.105 701.985 484.816 700.725 489.868C699.443 495.006 694.117 499.794 691.073 504.612C690.582 505.389 686.435 512.619 691.309 508.804C699.323 502.532 705.682 495.526 712.965 488.96C713.12 488.82 718.49 482.988 718.026 485.466C717.487 488.345 711.51 504.177 714.378 502.096C722.42 496.26 734.857 475.48 734.857 483.02C734.857 491.023 727.813 499.419 724.264 506.987C724.186 507.155 718.635 520.616 722.028 519.076C730.993 515.006 738.961 509.68 747.333 505.171C750.32 503.562 760.412 496.171 765.459 496.716C770.192 497.227 762.634 524.149 762.634 527.461C762.634 538.744 796.355 517.237 801.356 515.023C821.202 506.24 820.262 513.999 818.776 525.295C818.339 528.611 814.604 538.357 818.658 541.366C825.845 546.699 859.746 534.936 866.561 533.051C871.008 531.82 896.186 522.476 901.047 527.67C905.848 532.801 898.255 543.165 896.339 548.283C892.525 558.472 891.263 564.933 909.874 557.926C911.984 557.132 933.3 547.612 934.12 553.454C934.568 556.644 927.658 581.753 929.177 581.753C938.8 581.753 946.344 576.127 957.189 576.932C965.029 577.514 953.704 590.557 965.31 590.697C985.784 590.945 1004.76 585.636 1024.87 584.688C1038.7 584.036 1031.79 597.134 1034.28 601.737C1036.28 605.436 1043.9 595.843 1046.52 594.471C1052.28 591.452 1039.72 602.844 1034.28 606.07C1033.39 606.597 1037.43 594.34 1037.11 592.794C1036.83 591.467 1022.56 601.021 1022.04 601.388C1016.08 605.585 1009.18 610.572 1000.38 612.778C990.932 615.147 997.794 597.866 997.794 594.75C997.794 591.832 991.868 594.933 990.262 595.519C976.229 600.631 961.442 605.445 945.301 607.747C919.842 611.378 912.685 602.48 905.284 588.671C897.128 573.454 894.487 557.576 888.571 542.065C886.798 537.415 884.701 528.291 872.917 530.535C851.366 534.639 832.326 548.573 814.892 556.598C800.498 563.225 783.406 572.101 765.812 575.674C755.181 577.833 768.556 559.994 769.46 558.555C774.993 549.752 781.712 541.225 787.821 532.562C792.601 525.783 788.764 527.963 781.701 532.701C770.497 540.218 760.703 548.465 749.216 555.83C741.435 560.819 745.12 556.871 749.216 552.406C777.229 521.871 805.761 491.449 834.9 461.289C836.909 459.21 859.721 434.319 848.318 452.066C834.671 473.306 816.271 495.865 809.713 518.447C807.634 525.607 825.19 509.468 827.132 507.267C843.673 488.52 812.261 548.697 802.416 569.036C802.062 569.768 798.363 581.342 799.591 579.937C810.879 567.012 824.663 555.176 839.373 543.532C853.03 532.721 894.945 500.953 883.745 512.717C856.332 541.511 833.066 571.571 804.652 600.061C799.405 605.321 794.038 614.367 794.883 602.436C796.079 585.551 800.622 568.891 802.533 552.057C802.702 550.572 805.559 540.663 799.826 540.388C792.84 540.051 785.579 541.693 779.112 542.973C764.388 545.887 719.412 555.28 706.845 546.327C698.959 540.708 700.03 530.197 699.548 523.478C698.591 510.166 697.751 496.193 701.666 483.02C704.114 474.786 709.655 465.873 723.558 462.268C730.871 460.371 737.715 461.563 741.213 465.831C748.052 474.177 745.242 485.154 741.919 493.711C733.291 515.93 716.612 537.872 690.956 554.991C679.091 562.908 647.728 583.838 625.869 580.496C601.527 576.773 606.5 539.048 607.508 529.697C610.255 504.215 622.305 475.397 649.644 455.001C659.998 447.276 678.726 437.113 696.958 437.811C738.145 439.389 752.883 474.154 753.336 493.082C753.661 506.688 748.891 521.109 733.916 531.863C728.421 535.809 714.231 541.976 704.844 538.85C699.012 536.908 698.477 533.3 697.547 529.627C693.805 514.855 694.84 499.367 694.84 484.488C694.84 470.97 693.621 456.231 703.432 443.611C722.114 419.579 760.937 487.111 763.105 493.012C769.196 509.595 767.916 528.635 753.571 543.672C747.624 549.905 736.1 558.14 722.852 558.974C700.848 560.36 700.767 535.141 707.551 528.229C721.611 513.906 753.615 507.554 778.523 503.005C804.019 498.347 830.287 495.196 857.028 495.109C862.978 495.089 885.25 493.97 886.805 499.511C890.293 511.936 865.665 528.208 853.261 535.916C806.811 564.779 692.179 608.295 631.518 568.337C596.413 545.213 590.94 508.757 595.738 479.247C598.511 462.191 605.92 439.695 632.46 429.566C668.154 415.944 694.529 461.91 702.372 474.705C712.568 491.337 718.852 508.56 719.792 526.273C720.246 534.832 720.862 543.497 705.433 547.095C678.663 553.339 633.462 549.026 634.108 527.67C635.165 492.679 703.192 477.111 753.924 479.038C788.792 480.361 812.254 493.966 808.771 515.233C805.3 536.433 753.159 546.866 724.97 535.496C687.944 520.562 708.894 480.368 732.268 464.224C759.527 445.397 799.131 447.02 815.127 470.233C835.389 499.637 800.057 527.866 760.044 543.462C742.515 550.295 711.89 560.705 690.485 553.384C659.114 542.655 654.228 516.088 655.058 496.995C656.005 475.199 668.864 442.595 716.614 458.215C753.845 470.394 789.977 497.463 793.942 523.059C797.12 543.578 769.849 555.942 736.858 548.772C709.744 542.88 691.385 526.255 686.601 509.782C679.148 484.121 703.949 466.701 746.98 463.665C786.816 460.854 828.411 468.827 857.498 485.186C869.534 491.956 884.469 501.485 883.745 512.088C882.519 530.038 857.038 542.028 833.017 550.449C804.419 560.476 773.3 568.689 739.918 569.875C706.9 571.047 694.452 562.039 688.013 542.763C682.049 524.907 686.692 505.932 699.312 489.449C709.412 476.258 728.585 460.004 747.098 477.64C761.288 491.159 769.567 507.235 775.581 522.639C779.633 533.019 784.256 545.612 780.289 556.319C777.174 564.725 765.956 563.341 756.514 558.415C723.135 541.001 705.302 514.766 691.78 490.357C689.777 486.743 661.628 427.9 683.541 428.798C696.513 429.329 708.987 440.263 715.555 445.637C735.656 462.087 745.56 480.929 753.453 500.489C760.62 518.248 775.451 551.224 746.862 565.682C713.003 582.806 715.023 514.844 716.025 510.062C718.855 496.554 724.16 479.962 744.744 471.771C749.609 469.835 759.245 467.243 764.399 470.303C772.258 474.969 770.36 488.035 770.637 493.711C771.494 511.216 766.205 526.214 758.397 542.903"
                    stroke="#007DD7"
                    stroke-width="30"
                    stroke-linecap="round"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_f_161_492"
                    x="0"
                    y="0"
                    width="1885"
                    height="1445.99"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="BackgroundImageFix"
                      result="shape"
                    />
                    <feGaussianBlur
                      stdDeviation="300"
                      result="effect1_foregroundBlur_161_492"
                    />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        ))}
      </div>
      <button className={styles.submit__button} onClick={() => openModal()}>
        Проверить ответы
      </button>
      {active && (
        <Modal active={active} func={closeModal}>
          <div className={styles.modal}>
            <div className={styles.modal__close}>
              <button onClick={closeModal}>
                <img src={close} alt="" />
              </button>
            </div>

            <div className={styles.modal__score__section}>
              Вы набрали {calculateScore()} из {questions.length} правильных
              ответов!
            </div>
            <div className={styles.modal__title}>
              <p>
                Введите свою почту <br /> для получения промокода
              </p>
            </div>
            <input
              type="text"
              placeholder="Введите почту"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className={styles.modal__send} onClick={handleSubmit}>
              Отправить
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export { Quiz };
