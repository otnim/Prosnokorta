import Form from "../../common/form";
import Joi from "joi";
import { postQuestion } from "../../../services/questionService";
import { getClass } from "../../../services/classServices";
import { getCourses } from "../../../services/courseServices";
import { getChapters } from "../../../services/chapterServices";
import { getCurrentUser } from './../../../services/authService';


class AddNewQuestion extends Form {

    state = {
        data: {
            class_no: "",
            course: "",
            chapter: "",
            description: "",
            first_option: "",
            second_option: "",
            third_option: "",
            fourth_option: "",
            answer: "",
            explanation: ""
        },
        classes: [],
        courses: [],
        chapters: [],
        errors: {},
    };

    schema = Joi.object({

        class_no: Joi.number().min(1).max(500).required().label("Class"),
        course: Joi.number().min(1).max(5000).required().label("Course"),
        chapter: Joi.number().min(1).max(50000).required().label("Chapter"),

        description: Joi.string().min(5).max(500).required().label("Description"),
        first_option: Joi.string().min(1).max(255).required().label("First option"),
        second_option: Joi.string().min(1).max(255).required().label("Second option"),
        third_option: Joi.string().min(1).max(255).required().label("Third option"),
        fourth_option: Joi.string().min(1).max(255).required().label("Fourth option"),
        answer: Joi.number().min(1).max(4).required().label("Answer of the question"),
        explanation: Joi.string().min(5).max(1000).required().label("Explanation"),
    });

    async componentDidMount() {
        const { data: loadedClasses } = await getClass();
        this.setState({ classes: loadedClasses });

        const { data: loadedCourses } = await getCourses(this.state.data.class_no);
        this.setState({ courses: loadedCourses });

        const { data: loadedChapters } = await getChapters(this.state.data.course);
        this.setState({ chapters: loadedChapters });
    }

    async componentDidUpdate(prevProps, prevState) {
        if (this.state.data.class_no !== prevState.data.class_no) {

            const { data: loadedCourses } = await getCourses(this.state.data.class_no);
            this.setState({ courses: loadedCourses });
        }

        if (this.state.data.course !== prevState.data.course) {

            const { data: loadedChapter } = await getChapters(this.state.data.course);
            this.setState({ chapters: loadedChapter });
        }

    }


    doSubmit = async () => {
        const extraData = {
            "author": getCurrentUser().id,
        }
        const questionDetails = { ...this.state.data, ...extraData };
        try {
            const editabledata = {
                description: "",
                first_option: "",
                second_option: "",
                third_option: "",
                fourth_option: "",
                answer: "",
                explanation: ""
            }
            const newData = { ...this.state.data, ...editabledata };

            await postQuestion(questionDetails)
            alert('New question Added')
            this.setState({ data: newData });


        } catch (ex) {
            alert('Something Wrong');
            console.log(ex)
        }

    };


    render() {
        return (

            <div>
                <h2>New Question Insertion Form</h2>
                <form onSubmit={this.handleSubmit}>

                    {this.renderSelect("class_no", "Class", this.state.classes)}
                    {this.renderSelect("course", "Courses", this.state.courses)}
                    {this.renderSelect("chapter", "Chapters", this.state.chapters)}

                    {this.renderInput("description", "Description")}
                    {this.renderInput("first_option", "First Option")}
                    {this.renderInput("second_option", "Second option")}
                    {this.renderInput("third_option", "Third option")}
                    {this.renderInput("fourth_option", "Fourth option")}
                    {this.renderInput("answer", "Answer of the question")}
                    {this.renderInput("explanation", "Explanation of the Answer of the question")}

                    {this.renderButton("Add new Question")}
                </form>
            </div>
        );
    }
}

export default AddNewQuestion;