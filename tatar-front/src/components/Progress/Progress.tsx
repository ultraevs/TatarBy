import axios from "axios";
import { useEffect, useState } from "react";
import classNames from "classnames";

import styles from "./styles.module.scss";

const Progress = () => {
  const [profileData, setProfileData] = useState<any>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://tatarby.shmyaks.ru/v1/rating"
        );
        setProfileData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.container__text}>
        <h3>Отслеживайте ваш прогресс</h3>
        <p>
          Следите за вашим местом в таблице лидеров на TatarLearn. Специальные
          инструменты помогут вам отслеживать ваш прогресс в изучении татарского
          языка. Следите за вашими достижениями!
        </p>
      </div>
      <div className={styles.container__frame}>
        <div className={styles.container__frame__overflow}>
          {profileData &&
            profileData.map(
              (user: { nickname: string; score: string }, index: string) => (
                <div
                  key={index}
                  className={classNames(styles.item, styles[`item-${index}`])}
                >
                  <p>{index + 1}</p>
                  <p className={styles.item__nickname}>{user.nickname}</p>
                  <p>{user.score} очков</p>
                </div>
              )
            )}
        </div>

        <div className={styles.container__frame__vector}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1121"
            height="1324"
            viewBox="0 0 1121 1324"
            fill="none"
          >
            <g filter="url(#filter0_f_1_500)">
              <path
                d="M515.539 614.6C515.539 611.865 514.172 593.666 515.792 591.832C516.865 590.617 517.799 633.118 517.563 637.369C517.47 639.057 515.693 651.994 517.374 645.639C522.551 626.058 527.582 606.294 533.756 587.536C534.464 585.384 538.744 569.117 539.954 578.514C541.668 591.813 540.079 607.352 539.195 620.615C538.287 634.249 536.886 647.797 535.527 661.319C534.915 667.406 534.195 669.893 536.412 662.501C544.691 634.899 553.469 603.236 565.128 579.158C568.092 573.038 566.385 595.015 565.888 602.894C564.305 627.978 560.759 652.283 557.665 676.892C556.545 685.796 554.376 696.262 554.376 705.461C554.376 706.904 555.055 702.815 555.388 701.487C558.42 689.398 561.946 677.697 565.634 666.152C572.048 646.082 578.448 624.243 586.887 606.331C587.598 604.821 591.892 595.673 592.959 601.712C595.581 616.552 593.89 635.029 593.528 650.15C593.107 667.739 592.959 685.282 592.959 702.883C592.959 703.775 592.069 718.196 593.908 711.583C598.891 693.666 603.159 675.027 607.254 656.486C610.679 640.977 613.967 625.366 617.248 609.767C619.986 596.749 617.924 615.919 617.627 618.037C615.088 636.163 611.512 653.821 609.531 672.167C608.43 682.363 607.494 686.3 611.302 674.53C616.213 659.35 621.603 644.806 628.127 631.462C629.947 627.74 634.043 617.07 637.362 616.534C639.427 616.2 634.391 676.994 633.946 683.122C633.628 687.504 633.286 692.653 633.061 697.084C632.924 699.759 631.821 706.492 633.187 705.139C639.501 698.885 644.187 676.839 647.988 666.475C648.099 666.173 654.162 649.99 655.072 654.983C657.053 665.848 649.102 685.874 646.66 695.258C644.373 704.046 639.136 731.472 640.651 722.215C642.654 709.972 644.716 697.759 646.407 685.377C646.436 685.159 647.961 673.553 648.114 672.489C648.435 670.259 650.209 665.36 648.873 665.723C642.848 667.36 635.078 683.4 630.341 689.351C629.396 690.537 619.316 705.393 617.627 699.446C613.899 686.316 618.275 659.758 619.778 646.391C620.261 642.093 621.878 630.229 622.434 625.663C623.011 620.929 624.589 607.772 622.561 611.164C613.361 626.544 607.569 651.855 600.802 670.448C597.817 678.651 595.377 688.676 591.821 696.224C590.877 698.227 592.969 668.69 593.086 667.656C595.049 650.296 597.359 633.236 598.652 615.674C599.728 601.061 596.539 608.237 593.086 617.393C586.252 635.511 580.409 654.872 574.49 673.885C573.173 678.115 569.348 697.953 566.33 699.661C565.999 699.849 565.634 662.076 565.634 660.353C565.634 646.612 567.47 627.922 563.674 615.03C557.097 592.694 544.046 615.401 536.729 622.978C523.96 636.198 528.028 593.758 528.632 582.273C528.663 581.698 529.115 565.93 528.949 566.055C526.912 567.592 526.167 588.059 525.786 591.295C524.877 599.012 523.84 606.732 523.509 614.6C523.017 626.296 525.01 591.235 526.545 579.803C529.003 561.492 532.328 543.595 536.665 526.317C536.793 525.811 540.249 510.459 540.524 518.155C541.905 556.858 535.772 597.966 531.605 635.866C531.603 635.886 529.592 654.494 531.099 649.828C538.618 626.548 546.361 603.986 555.514 582.38C556.604 579.808 564.217 558.084 567.153 558.537C569.416 558.887 566.37 602.545 566.267 604.29C564.804 629.06 562.708 653.653 561.713 678.503C561.461 684.807 559.552 705.606 565.002 690.854C569.807 677.848 573.538 663.851 578.538 651.009C579.689 648.051 582.592 637.652 584.989 636.295C585.123 636.22 585.728 705.229 586.381 714.268C587.736 733.033 598.441 715.109 602.131 708.79C615.614 685.696 625.219 657.384 635.338 630.066C637.916 623.105 644.081 598.844 649.063 595.591C649.994 594.983 646.964 627.908 646.723 629.851C645.188 642.196 643.132 654.521 642.042 667.012C641.91 668.531 641.371 673.506 642.422 669.374C643.899 663.566 645.586 655.322 648.557 651.224C650.084 649.118 645.266 677.953 645.078 679.04C641.276 701.114 638.247 723.174 636.35 745.951C636.064 749.386 633.347 770.964 636.097 755.724C638.516 742.31 640.984 728.886 643.56 715.556C644.527 710.554 646.47 704.052 646.47 698.587C646.47 695.981 645.553 703.596 644.825 705.89C644.626 706.519 646.821 692.374 647.608 689.351C648.439 686.165 656.471 652.153 655.325 667.226C654.816 673.929 649.872 701.104 656.717 686.129C657.583 684.233 668.102 660.895 668.102 670.019C668.102 675.267 662.439 693.156 665.445 685.914C668.931 677.519 672.066 668.665 675.882 660.675C676.631 659.106 681.05 650.976 680.373 658.742C679.684 666.638 676.821 673.998 675.186 681.403C674.922 682.599 672.693 693.71 675.313 687.847C679.62 678.207 683.037 667.438 686.951 657.346C687.034 657.131 689.92 648.166 689.671 651.976C689.381 656.401 686.169 680.735 687.71 677.537C692.032 668.567 698.716 636.627 698.716 648.217C698.716 660.517 694.93 673.422 693.023 685.055C692.981 685.312 689.998 706.003 691.821 703.635C696.639 697.379 700.921 689.193 705.42 682.262C707.025 679.79 712.449 668.43 715.161 669.267C717.705 670.052 713.643 711.432 713.643 716.523C713.643 733.866 731.765 700.808 734.453 697.406C745.118 683.906 744.613 695.831 743.814 713.194C743.579 718.291 741.572 733.271 743.751 737.896C747.613 746.093 765.831 728.013 769.494 725.115C771.884 723.224 785.414 708.861 788.027 716.845C790.607 724.731 786.526 740.661 785.497 748.528C783.447 764.188 782.769 774.119 792.77 763.349C793.904 762.128 805.36 747.496 805.8 756.476C806.041 761.379 802.328 799.973 803.144 799.973C808.315 799.973 812.37 791.325 818.198 792.562C822.411 793.456 816.325 813.504 822.562 813.72C833.565 814.101 843.761 805.94 854.567 804.484C862 803.482 858.288 823.614 859.627 830.689C860.703 836.373 864.797 821.629 866.205 819.52C869.302 814.88 862.548 832.389 859.627 837.348C859.15 838.158 861.32 819.319 861.145 816.942C860.995 814.903 853.329 829.588 853.049 830.152C849.846 836.603 846.14 844.268 841.411 847.658C836.332 851.3 840.019 824.738 840.019 819.949C840.019 815.465 836.835 820.231 835.971 821.131C828.43 828.988 820.483 836.387 811.809 839.926C798.127 845.507 794.281 831.83 790.304 810.605C785.921 787.216 784.501 762.812 781.322 738.97C780.369 731.823 779.242 717.799 772.91 721.249C761.328 727.556 751.096 748.973 741.727 761.309C733.991 771.493 724.806 785.136 715.351 790.629C709.638 793.948 716.826 766.527 717.311 764.316C720.285 750.786 723.896 737.679 727.179 724.363C729.747 713.944 727.685 717.294 723.89 724.578C717.868 736.132 712.605 748.807 706.432 760.127C702.25 767.796 704.231 761.728 706.432 754.865C721.486 707.932 736.819 661.172 752.479 614.815C753.559 611.619 765.818 573.361 759.69 600.638C752.356 633.285 742.468 667.96 738.943 702.668C737.826 713.674 747.261 688.867 748.305 685.484C757.194 656.67 740.313 749.163 735.022 780.426C734.832 781.55 732.844 799.341 733.504 797.18C739.57 777.315 746.978 759.122 754.883 741.225C762.222 724.609 784.748 675.78 778.729 693.862C763.997 738.118 751.494 784.322 736.224 828.112C733.404 836.198 730.52 850.102 730.974 831.763C731.617 805.81 734.058 780.203 735.085 754.328C735.176 752.046 736.711 736.816 733.63 736.392C729.876 735.875 725.974 738.398 722.498 740.366C714.585 744.844 690.415 759.282 683.662 745.521C679.424 736.885 680 720.728 679.74 710.401C679.226 689.941 678.774 668.464 680.879 648.217C682.194 635.56 685.172 621.86 692.643 616.319C696.573 613.404 700.251 615.235 702.131 621.796C705.806 634.624 704.296 651.497 702.511 664.649C697.874 698.799 688.91 732.525 675.123 758.839C668.747 771.007 651.892 803.177 640.145 798.04C627.063 792.318 629.736 734.334 630.277 719.96C631.754 680.794 638.229 636.5 652.922 605.149C658.486 593.276 668.551 577.655 678.349 578.729C700.482 581.153 708.403 634.588 708.646 663.682C708.821 684.594 706.258 706.761 698.21 723.289C695.257 729.354 687.631 738.834 682.586 734.029C679.452 731.044 679.165 725.499 678.665 719.852C676.654 697.147 677.21 673.342 677.21 650.472C677.21 629.695 676.555 607.04 681.827 587.643C691.868 550.705 712.731 654.504 713.896 663.575C717.169 689.063 716.481 718.329 708.773 741.44C705.577 751.021 699.384 763.678 692.264 764.96C680.439 767.09 680.395 728.327 684.041 717.704C691.597 695.689 708.796 685.926 722.182 678.933C735.883 671.774 750 666.932 764.371 666.797C767.568 666.767 779.537 665.046 780.373 673.563C782.248 692.66 769.012 717.672 762.347 729.518C737.384 773.883 675.78 840.769 643.181 779.352C624.315 743.809 621.374 687.774 623.952 642.417C625.443 616.202 629.424 581.624 643.687 566.055C662.869 545.117 677.043 615.769 681.258 635.436C686.737 660.999 690.114 687.472 690.619 714.697C690.863 727.854 691.194 741.171 682.903 746.702C668.516 756.299 644.226 749.669 644.572 716.845C645.14 663.063 681.699 639.134 708.962 642.095C727.7 644.13 740.309 665.04 738.437 697.728C736.572 730.313 708.551 746.349 693.402 728.874C673.504 705.919 684.763 644.139 697.324 619.326C711.973 590.388 733.257 592.883 741.853 628.562C752.742 673.757 733.754 717.145 712.251 741.118C702.831 751.62 686.373 767.62 674.87 756.368C658.011 739.877 655.385 699.043 655.831 669.697C656.34 636.195 663.251 586.08 688.912 610.09C708.92 628.81 728.337 670.415 730.468 709.757C732.176 741.296 717.521 760.3 699.791 749.28C685.219 740.223 675.353 714.67 672.782 689.351C668.777 649.908 682.106 623.134 705.23 618.467C726.638 614.146 748.992 626.4 764.624 651.546C771.092 661.95 779.118 676.597 778.729 692.895C778.07 720.484 764.376 738.913 751.467 751.858C736.099 767.269 719.375 779.892 701.435 781.715C683.691 783.517 677.002 769.671 673.541 740.044C670.336 712.597 672.831 683.433 679.614 658.097C685.041 637.822 695.345 612.84 705.294 639.947C712.92 660.725 717.369 685.436 720.601 709.112C722.778 725.067 725.263 744.423 723.131 760.879C721.457 773.799 715.428 771.673 710.354 764.101C692.416 737.335 682.832 697.01 675.566 659.494C674.49 653.938 659.362 563.495 671.138 564.874C678.109 565.69 684.813 582.497 688.342 590.758C699.145 616.041 704.467 645.002 708.709 675.067C712.561 702.363 720.531 753.048 705.167 775.271C686.971 801.59 688.057 697.131 688.595 689.78C690.116 669.018 692.967 643.516 704.029 630.925C706.643 627.949 711.822 623.967 714.592 628.67C718.815 635.841 717.795 655.924 717.944 664.649C718.404 691.554 715.562 714.607 711.366 740.258"
                stroke="#007DD7"
                stroke-width="30"
                stroke-linecap="round"
              />
            </g>
            <defs>
              <filter
                id="filter0_f_1_500"
                x="0"
                y="0.966614"
                width="1382"
                height="1362.03"
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
                  stdDeviation="250"
                  result="effect1_foregroundBlur_1_500"
                />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
};

export { Progress };
