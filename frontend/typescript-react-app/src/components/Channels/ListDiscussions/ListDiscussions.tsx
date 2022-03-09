import './ListDiscussions.scss';
import SingleMessage from "./SingleMessage/SingleMessage";

export default function ListDiscussions() {
    return (
        <div id="ListDiscussions">
            <p id="discussions--title">List of messages</p>
            <div className="overflow-auto" id="sub--div">
                <SingleMessage username="malatini" text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta illo inventore magni neque omnis ratione iure, in nesciunt, doloribus mollitia, deleniti officiis iusto tempora ad laborum quibusdam earum accusantium blanditiis." />
                <SingleMessage username="bahaas" text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta illo inventore magni neque omnis ratione iure, in nesciunt, doloribus mollitia, deleniti officiis iusto tempora ad laborum quibusdam earum accusantium blanditiis." />
                <SingleMessage username="rbourgea" text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta illo inventore magni neque omnis ratione iure, in nesciunt, doloribus mollitia, deleniti officiis iusto tempora ad laborum quibusdam earum accusantium blanditiis." />
                <SingleMessage username="macrespo" text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta illo inventore magni neque omnis ratione iure, in nesciunt, doloribus mollitia, deleniti officiis iusto tempora ad laborum quibusdam earum accusantium blanditiis." />
                <SingleMessage username="darbib" text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta illo inventore magni neque omnis ratione iure, in nesciunt, doloribus mollitia, deleniti officiis iusto tempora ad laborum quibusdam earum accusantium blanditiis." />
            </div>
        </div>
    );
}
