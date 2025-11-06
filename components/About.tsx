import Section from '@/components/Section';

const About = () => {
  return (
    <Section title="About" className="flex flex-col gap-3">
      <p className="text-[14px] leading-6 text-foreground">
        Hi, this is my portfolio website.
      </p>

      <p className="text-[14px] leading-6 text-foreground">
        I'm a software engineer—my job is to solve your software problems and
        build what you need. My recent projects have been mostly frontend work,
        so I designed this site to mimic LinkedIn to show that if a designer
        hands me a spec, I can replicate it as a website beautifully.
      </p>

      <p className="text-[14px] leading-6 text-foreground">
        But I can still do backend work. Remember: I build the software you
        need. Whatever the scope is (even mobile apps, though I haven't studied
        them yet), my job is to get it done.
      </p>

      <p className="text-[14px] leading-6 text-foreground">
        Some interesting things on this site:
      </p>

      <ul className="list-disc pl-4">
        <li className="text-[14px] leading-6 text-foreground">
          <span className="font-medium">Chatbot</span> – You can talk to a
          chatbot version of me. I've drafted questions and answers if you want
          to get to know me. There's Han Solo (a script from Star Wars: A New
          Hope), Edna where I talk about my projects and clean code, and others.
        </li>
        <li className="text-[14px] leading-6 text-foreground">
          <span className="font-medium">Posts</span> – Content from my CMS
          (Sanity). I talk about my ideas in software.
        </li>
        <li className="text-[14px] leading-6 text-foreground">
          <span className="font-medium">Software Engineer Checklist</span> – I
          list down the skills I value as a software engineer and my progress on
          them.
        </li>
      </ul>
    </Section>
  );
};

export default About;
