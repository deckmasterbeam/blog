interface Props {
  href: string;
  label?: string;
}

export default function InstallButton({ href, label = 'Install Userscript' }: Props) {
  return (
    <a href={href} className="install-button">
      {label}
      <style>{`
        .install-button {
          display: inline-block;
          padding: 0.6rem 1.25rem;
          background: #111;
          color: #fff;
          text-decoration: none;
          border-radius: 5px;
          font-size: 0.9rem;
          font-weight: 500;
        }
        .install-button:hover {
          opacity: 0.8;
        }
      `}</style>
    </a>
  );
}
