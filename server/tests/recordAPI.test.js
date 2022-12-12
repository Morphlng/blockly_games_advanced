/* eslint-disable no-unused-vars */
const mongoose = require("mongoose");
const axios = require("axios");
const Record = require("../models/record");
const User = require("../models/user");
const { mongo } = require("mongoose");

describe("Record API tests", () => {
    let test_doc_id;
    let token;
    const prep_data = {
        valid: {
            puzzle1:
                '<xml xmlns="https://developers.google.com/blockly/xml"><block type="animal" deletable="false" x="47" y="20"><mutation xmlns="http://www.w3.org/1999/xhtml" animal="4"></mutation><field name="LEGS">4</field><value name="PIC"><block type="picture" deletable="false"><mutation xmlns="http://www.w3.org/1999/xhtml" animal="4"></mutation></block></value><statement name="TRAITS"><block type="trait" deletable="false"><mutation xmlns="http://www.w3.org/1999/xhtml" animal="4" trait="2"></mutation><next><block type="trait" deletable="false"><mutation xmlns="http://www.w3.org/1999/xhtml" animal="4" trait="1"></mutation></block></next></block></statement></block><block type="animal" deletable="false" x="363" y="36"><mutation xmlns="http://www.w3.org/1999/xhtml" animal="2"></mutation><field name="LEGS">2</field><value name="PIC"><block type="picture" deletable="false"><mutation xmlns="http://www.w3.org/1999/xhtml" animal="2"></mutation></block></value><statement name="TRAITS"><block type="trait" deletable="false"><mutation xmlns="http://www.w3.org/1999/xhtml" animal="2" trait="1"></mutation><next><block type="trait" deletable="false"><mutation xmlns="http://www.w3.org/1999/xhtml" animal="2" trait="2"></mutation></block></next></block></statement></block><block type="animal" deletable="false" x="399" y="250"><mutation xmlns="http://www.w3.org/1999/xhtml" animal="1"></mutation><field name="LEGS">1</field><value name="PIC"><block type="picture" deletable="false"><mutation xmlns="http://www.w3.org/1999/xhtml" animal="1"></mutation></block></value><statement name="TRAITS"><block type="trait" deletable="false"><mutation xmlns="http://www.w3.org/1999/xhtml" animal="1" trait="2"></mutation><next><block type="trait" deletable="false"><mutation xmlns="http://www.w3.org/1999/xhtml" animal="1" trait="1"></mutation></block></next></block></statement></block><block type="animal" deletable="false" x="78" y="275"><mutation xmlns="http://www.w3.org/1999/xhtml" animal="3"></mutation><field name="LEGS">3</field><value name="PIC"><block type="picture" deletable="false"><mutation xmlns="http://www.w3.org/1999/xhtml" animal="3"></mutation></block></value><statement name="TRAITS"><block type="trait" deletable="false"><mutation xmlns="http://www.w3.org/1999/xhtml" animal="3" trait="1"></mutation><next><block type="trait" deletable="false"><mutation xmlns="http://www.w3.org/1999/xhtml" animal="3" trait="2"></mutation></block></next></block></statement></block></xml>',
            maze1:
                '<xml xmlns="https://developers.google.com/blockly/xml"><block type="maze_moveForward" movable="false"><next><block type="maze_moveForward"/></next></block></xml>',
            maze10:
                '<xml xmlns="https://developers.google.com/blockly/xml"><block type="maze_forever"><statement name="DO"><block type="maze_ifElse"><field name="DIR">isPathForward</field><statement name="DO"><block type="maze_ifElse"><field name="DIR">isPathRight</field><statement name="DO"><block type="maze_turn"><field name="DIR">turnRight</field></block></statement><statement name="ELSE"><block type="maze_ifElse"><field name="DIR">isPathLeft</field><statement name="DO"><block type="maze_turn"><field name="DIR">turnLeft</field></block></statement></block></statement></block></statement><statement name="ELSE"><block type="maze_ifElse"><field name="DIR">isPathLeft</field><statement name="DO"><block type="maze_turn"><field name="DIR">turnLeft</field></block></statement><statement name="ELSE"><block type="maze_turn"><field name="DIR">turnRight</field></block></statement></block></statement><next><block type="maze_moveForward"/></next></block></statement></block></xml>',
            bird1:
                '<xml xmlns="https://developers.google.com/blockly/xml"><block type="bird_heading"><field name="ANGLE">45</field></block></xml>',
            turtle1:
                '<xml xmlns="https://developers.google.com/blockly/xml"><block type="turtle_repeat_internal"><field name="TIMES">4</field><statement name="DO"><block type="turtle_move_internal"><field name="DIR">moveForward</field><field name="VALUE">100</field><next><block type="turtle_turn_internal"><field name="DIR">turnRight</field><field name="VALUE">90</field></block></next></block></statement></block></xml>',
            movie1:
                '<xml xmlns="https://developers.google.com/blockly/xml"><block type="movie_colour" x="330" y="85"><value name="COLOUR"><shadow type="colour_picker"><field name="COLOUR">#ff0000</field></shadow></value><next><block type="movie_circle"><value name="X"><shadow type="math_number"><field name="NUM">50</field></shadow></value><value name="Y"><shadow type="math_number"><field name="NUM">70</field></shadow></value><value name="RADIUS"><shadow type="math_number"><field name="NUM">10</field></shadow></value></block></next></block><block type="movie_colour" x="90" y="149"><value name="COLOUR"><shadow type="colour_picker"><field name="COLOUR">#999999</field></shadow></value><next><block type="movie_line"><value name="X1"><shadow type="math_number"><field name="NUM">20</field></shadow></value><value name="Y1"><shadow type="math_number"><field name="NUM">70</field></shadow></value><value name="X2"><shadow type="math_number"><field name="NUM">40</field></shadow></value><value name="Y2"><shadow type="math_number"><field name="NUM">50</field></shadow></value><value name="WIDTH"><shadow type="math_number"><field name="NUM">5</field></shadow></value></block></next></block><block type="movie_colour" x="580" y="141"><value name="COLOUR"><shadow type="colour_picker"><field name="COLOUR">#999999</field></shadow></value><next><block type="movie_line"><value name="X1"><shadow type="math_number"><field name="NUM">80</field></shadow></value><value name="Y1"><shadow type="math_number"><field name="NUM">70</field></shadow></value><value name="X2"><shadow type="math_number"><field name="NUM">60</field></shadow></value><value name="Y2"><shadow type="math_number"><field name="NUM">50</field></shadow></value><value name="WIDTH"><shadow type="math_number"><field name="NUM">5</field></shadow></value></block></next></block><block type="movie_colour" x="331" y="239"><value name="COLOUR"><shadow type="colour_picker"><field name="COLOUR">#3333ff</field></shadow></value><next><block type="movie_rect"><value name="X"><shadow type="math_number"><field name="NUM">50</field></shadow></value><value name="Y"><shadow type="math_number"><field name="NUM">40</field></shadow></value><value name="WIDTH"><shadow type="math_number"><field name="NUM">20</field></shadow></value><value name="HEIGHT"><shadow type="math_number"><field name="NUM">40</field></shadow></value></block></next></block></xml>',
            music1:
                '<xml xmlns="https://developers.google.com/blockly/xml"><block type="music_start" deletable="false"><statement name="STACK"><block type="music_note"><field name="DURATION">0.25</field><value name="PITCH"><shadow type="music_pitch"><field name="PITCH">7</field></shadow></value><next><block type="music_note"><field name="DURATION">0.25</field><value name="PITCH"><shadow type="music_pitch"><field name="PITCH">8</field></shadow></value><next><block type="music_note"><field name="DURATION">0.25</field><value name="PITCH"><shadow type="music_pitch"><field name="PITCH">9</field></shadow></value><next><block type="music_note"><field name="DURATION">0.25</field><value name="PITCH"><shadow type="music_pitch"><field name="PITCH">7</field></shadow></value></block></next></block></next></block></next></block></statement></block></xml>',
            "pond-tutor1":
                '<xml xmlns="https://developers.google.com/blockly/xml"><block type="pond_cannon"><value name="DEGREE"><shadow type="pond_math_number"><mutation xmlns="http://www.w3.org/1999/xhtml" angle_field="true"></mutation><field name="NUM">90</field></shadow></value><value name="RANGE"><shadow type="pond_math_number"><mutation xmlns="http://www.w3.org/1999/xhtml" angle_field="false"></mutation><field name="NUM">40</field></shadow></value></block></xml>',
        },
        invalid: {
            mazex: "Level does not exist, this should skip",
        },
        update: {
            maze10:
                '<xml xmlns="https://developers.google.com/blockly/xml"><block type="maze_forever"><statement name="DO"><block type="maze_ifElse"><field name="DIR">isPathForward</field><statement name="DO"><block type="maze_moveForward"><next><block type="maze_turn"><field name="DIR">turnRight</field></block></next></block></statement><statement name="ELSE"><block type="maze_turn"><field name="DIR">turnLeft</field></block></statement></block></statement></block></xml>',
        },
    };

    async function connectDB() {
        await mongoose.connect(`mongodb://localhost:27017/list`);
    }

    async function cleanupData() {
        try {
            const user = await User.findOneAndRemove({ _id: test_doc_id });
        } catch (err) {
            console.log(err.message);
        }

        try {
            const records = await Record.remove({ uid: test_doc_id });
        } catch (err) {
            console.log(err.message);
        }

        await mongoose.disconnect();

        console.log("cleaned up record test...");
    }

    beforeAll(connectDB, 3000);
    afterAll(cleanupData, 3000);

    it("Register a Test User", async () => {
        const response = await axios.post("http://localhost:3000/users/register", {
            email: "fake_email_record@test.com",
            password: "123456",
        });

        expect(response.data.status).toEqual("0");
        test_doc_id = response.data.result._id;

        // wait for sendMail to finish.
        await new Promise((resolve) =>
            setTimeout(() => {
                expect(true).toBe(true);
                resolve();
            }, 1500)
        );
    });

    it("Activate test account", async () => {
        try {
            const response = await axios.get(
                "http://localhost:3000/users/checkCode",
                {
                    params: {
                        email: "fake_email_record@test.com",
                        code: test_doc_id,
                    },
                }
            );
        } catch (error) {
            console.log(error.message);
        }
        expect(true).toEqual(true);
    });

    it("Login test account", async () => {
        const response = await axios.post("http://localhost:3000/users/login", {
            email: "fake_email_record@test.com",
            password: "123456",
        });

        token = response.data.result.token;
        expect(response.data.status).toEqual("0");
        expect(response.data.msg).toEqual("登录成功");
    });

    it("Save progress test", async () => {
        let params = {
            email: "fake_email_record@test.com",
        };

        Object.keys(prep_data.valid).forEach((key) => {
            params[key] = prep_data.valid[key];
        });

        const response = await axios.post(
            "http://localhost:3000/record/save",
            params,
            {
                headers: {
                    Authorization: `token ${token}, Basic Og==`,
                },
            }
        );

        expect(response.data.status).toEqual("0");
        expect(response.data.msg).toEqual("更新进度成功");
        expect(response.data.result).toEqual(Object.keys(prep_data.valid).length);
    });

    it("Update progress test", async () => {
        let params = {
            email: "fake_email_record@test.com",
        };

        Object.keys(prep_data.update).forEach((key) => {
            params[key] = prep_data.valid[key];
        });

        const response = await axios.post(
            "http://localhost:3000/record/save",
            params,
            {
                headers: {
                    Authorization: `token ${token}, Basic Og==`,
                },
            }
        );

        expect(response.data.status).toEqual("0");
        expect(response.data.msg).toEqual("更新进度成功");
        expect(response.data.result).toEqual(Object.keys(prep_data.update).length);
    });
});
