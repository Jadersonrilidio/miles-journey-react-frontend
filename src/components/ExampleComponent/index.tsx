import styles from './ExampleComponent.module.scss';

interface ExampleComponentProps {
  sampleText?: string
}

const ExampleComponent = ({ sampleText = "Sample text." }: ExampleComponentProps) => {
  return (
    <div className={styles.testClass}>
      <h1>Example Component</h1>
      <p>{ sampleText }</p>
    </div>
  );
};

export default ExampleComponent;
