import Section from '@/components/Section';

const About = () => {
  return (
    <Section title="About">
      <p className="text-[14px] leading-6 text-foreground">
        I'm developing a LinkedIn-inspired portfolio site to showcase my skills.
        It's currently a work in progress —{' '}
        <a
          href="https://syazsolo.netlify.app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          https://syazsolo.netlify.app
        </a>
        .
      </p>
    </Section>
  );
};

export default About;
