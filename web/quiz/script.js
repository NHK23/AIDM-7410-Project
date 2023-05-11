$(document).ready(function () {
    const questions = [   
        {   
            question: "Are CPR, artificial respiration, and AED related?",        
            options: ["A.Yes", "B.No"],
            answer: "Yes, CPR is a hands-on rescue before getting the AED. The latest AHA guidelines state that artificial respiration may not be necessary, but CPR should be continued until the AED arrives, a doctor arrives, or the person's breathing and consciousness are restored.",
        },
        {
            question: "Do you need to determine the person's consciousness and breathing before performing CPR? How?",
            options: ["A.Yes (observe, tap, call, etc.)", "B.No"],
            answer: "Answer: Yes, you need to determine. Gently tap the shoulder, call out by their ear, and observe the chest movement for no more than 7 seconds. Confirm that the person is unconscious and has abnormal breathing before performing CPR.",
        },
        {
            question: "What is the compression rate per minute for CPR?",
            options: ["A.70-90 times per minute", "B.80-100 times per minute", "C.90-110 times per minute", "D.100-120 times per minute"],
            answer: "Answer: 100-120 times per minute",
        },
        {
            question: "What is the effective compression depth for CPR?",
            options: ["A.3-4cm", "B.4-5cm", "C.5-6cm", "D.6-7cm"],
            answer: "Answer: 5-6cm",
        },
        {
            question: "What are the number of compressions and groups for CPR and artificial respiration?",
            options: ["A.25 per group", "B.30 per group", "C.35 per group", "D.40 per group"],
            answer: "Answer: 30 compressions followed by 2 artificial respirations form one group, with five groups in one cycle. After the cycle, check for breathing and pulse. The latest AHA guidelines state that artificial respiration may not be necessary, but CPR should be continued until the AED arrives, a doctor arrives, or the person's breathing and consciousness are restored.",
        },
        {
            question: "Do you need to clear foreign objects from the mouth before performing artificial respiration?",
            options: ["A.Yes", "B.No"],
            answer: "Answer: Yes",
        },
        {
            question: "Do you need to remove a woman's bra when performing CPR?",
            options: ["A.Yes", "B.No"],
            answer: "Answer: No",
        },
        {
            question: "Do you need to remove a woman's bra when using an AED?",
            options: ["A.Yes", "B.No", "C.Depends on the situation"],
            answer: "Answer: According to the Singapore Heart Foundation's promotional video, if a woman's bra has metal parts, they should be slightly moved aside. If there are exposed wires, there may be a slight risk of skin burns. However, it is more important to promptly attach the electrode pads and follow the AED's instructions for defibrillation. Friendly reminder: When assisting a woman, you can cover her with her outerwear to protect her privacy while striving to save time for the rescue.",
        },
        {
            question: "What should you pay attention to when using an AED?",
            options: ["A.Pad placement", "B.Whether there is water on the body", "C.Whether there are metal objects", "D.Privacy", "E.Whether someone else is touching", "F.All of the above"],
            answer: "Answer: Follow the prompts to place the two electrode pads on the designated locations on the person. Make sure there is no water on the body, move or remove any metal objects from the undergarments, and cover the woman's chest with a coat to protect her privacy if necessary. When the AED is ready, voice prompts will be provided. During the defibrillation process, no one should touch the person.",
        },
        {
            question: "What position should a person be in after their breathing is restored?",
            options: ["A.Lying flat", "B.Recovery position", "C.Prone", "D.Sitting up"],
            answer: "Answer: Recovery position",
        },
    ];

    
    function renderQuestion(question, index) {
        const $questionContainer = $("<div>", { class: "question-container" });
        if (index === 0) {
            $questionContainer.addClass("active");
        }

        const $questionTitle = $("<h3>", { text: `${index + 1}) ${question.question}` });
        $questionContainer.append($questionTitle);

        question.options.forEach((option) => {
            const $option = $("<div>", { class: "option", text: option });
            $option.attr("data-option", option);
            $option.on("click", function () {
                $option.parent().find(".option").removeClass("selected");
                $option.addClass("selected");
            });
            $questionContainer.append($option);
        });

        const $answer = $("<div>", { class: "answer", text: question.answer });
        $questionContainer.append($answer);

        $("#quiz-container").append($questionContainer);
    }

    questions.forEach(renderQuestion);

    const $showAnswerBtn = $(".show-answer");
    const $nextQuestionBtn = $(".next-question");

    $showAnswerBtn.on("click", function () {
        const $currentQuestion = $(".question-container.active");
        const $answer = $currentQuestion.find(".answer");

        $answer.show();
        $showAnswerBtn.hide();
        $nextQuestionBtn.removeClass('d-none').show();

        // Disable options
        $currentQuestion.find(".option").css("pointer-events", "none");
    });

    $nextQuestionBtn.on("click", function () {
        const $currentQuestion = $(".question-container.active");
        const $nextQuestion = $currentQuestion.next();
    
        $currentQuestion.removeClass("active");
        $nextQuestion.addClass("active");
    
        $nextQuestionBtn.hide().addClass('d-none');
        $showAnswerBtn.show();
        $nextQuestion.find(".answer").hide();
    
        // Enable options
        $nextQuestion.find(".option").css("pointer-events", "auto");
    
        if ($nextQuestion.is(":last-child")) {
            $nextQuestionBtn.text("Finish");
            $nextQuestionBtn.off("click");
            $nextQuestionBtn.on("click", function () {
                // Fade out quiz container, buttons, and headers
                $("#quiz-container").fadeOut(1000);
                $(".buttons-container").fadeOut(1000);
                $(".quiz-header").fadeOut(1000, function () {
                    $(this).remove();  // Remove content from the document flow
                });
                
                // Move .new-content to the top
                $(".new-content").prependTo(".container");
            
                // Fade in new content sections after the fade out animation is complete
                $(".content-section").fadeIn(1000);
    
                // Modify layout
                $(".container").removeClass("d-flex align-items-center justify-content-center").addClass("pt-5");
    
                // Redirect to main.html
                window.location.href = "../main/main.html";
            });
        } else {
            $nextQuestionBtn.text("Next Question");
        }
    });
    
    $(".cover-screen").on("click", function () {
        $(this).slideUp(1000);
        setTimeout(function () {
            $(".container").removeClass("blurred");
        }, 1000);
    });    
});
    