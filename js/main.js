




(() => {

    let yOffset = 0;    //window.pageYOffset 대신 쓸 변수
    let prevScrollHeight = 0;  //현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
    let currentScene = 0; //현재 활성화된 (눈 앞에 보고있는) 씬 (scroll-section)

    const sceneInfo = [
        {
            // 0번째 섹션
            type : 'sticky',
            heightNum : 5, //브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight : 0,
            objs : {
                container : document.querySelector('#scroll-section-0')
            }
        },
        {
            // 1
            type : 'normal',
            heightNum : 5, 
            scrollHeight : 0,
            objs : {
                container : document.querySelector('#scroll-section-1')
            }
        },
        {
            // 2
            type : 'sticky',
            heightNum : 5, 
            scrollHeight : 0,
            objs : {
                container : document.querySelector('#scroll-section-2')
            }
        },
        {
            // 3
            type : 'sticky',
            heightNum : 5, 
            scrollHeight : 0,
            objs : {
                container : document.querySelector('#scroll-section-3')
            }
        }
    ];




    // 각 스크롤 섹션의 높이 세팅
    function setLayout() {
		for (let i = 0; i < sceneInfo.length; i++) {
            sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
        }


        // 자동으로 currentScene 확인
        let totalScrollHeight = 0;
        for (let i = 0; i < sceneInfo.length; i++) {
            totalScrollHeight += sceneInfo[i].scrollHeight;
            if (totalScrollHeight >= pageYOffset) {
                currentScene = i;
                break;
            }
        }

        document.body.setAttribute('id', `show-scene-${currentScene}`)


    }





    function scrollLoop() {
        prevScrollHeight = 0; 
        for(let i = 0; i < currentScene; i++) {
            prevScrollHeight = prevScrollHeight + sceneInfo[i].scrollHeight;
        }
        if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
            currentScene++;
        }
        if (yOffset < prevScrollHeight) {
            
            // 브라우저 바운스 효과로 인해 마이너스가 되는 것을 방지 (모바일)
            if (currentScene == 0) {
                return;
            }
            currentScene--;
        }
 
    }






    window.addEventListener('scroll', () => {
        yOffset = window.pageYOffset;
        scrollLoop();
    });

    window.addEventListener('load', setLayout);
    // = window.addEventListener('DOMContentloaded', setLayout)
    window.addEventListener('resize', setLayout);

}) ();
 



